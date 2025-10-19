import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
        return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error: any) {
        console.error('Webhook signature verification failed:', error.message);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }


    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('✅ Checkout session completed:', session.id);

            try {
                // Check if this webhook has already been processed
                const existingWebhook = await prisma.processedWebhook.findUnique({
                    where: { sessionId: session.id },
                });

                if (existingWebhook) {
                    console.log(`⚠️ Webhook already processed for session: ${session.id}`);
                    return NextResponse.json({
                        received: true,
                        message: 'Webhook already processed'
                    });
                }

                const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
                    expand: ['line_items.data.price.product'],
                });

                if (fullSession.payment_status === 'paid') {
                    const product = fullSession.line_items?.data[0].price?.product as Stripe.Product;
                    const creditsToAdd = parseInt(product.metadata.credits || '0');
                    const customerEmail = session.customer_email;

                    if (customerEmail && creditsToAdd > 0) {
                        const user = await prisma.user.findUnique({
                            where: { email: customerEmail },
                        });

                        if (user) {
                            // Use a transaction to ensure both operations succeed or fail together
                            await prisma.$transaction(async (tx) => {
                                // Update user credits
                                const updatedUser = await tx.user.update({
                                    where: { email: customerEmail },
                                    data: {
                                        creditsAvailable: { increment: creditsToAdd },
                                    },
                                });
                                console.log(`💳 User ${updatedUser.email} now has ${updatedUser.creditsAvailable} credits`);

                                // Mark webhook as processed
                                await tx.processedWebhook.create({
                                    data: {
                                        sessionId: session.id,
                                    },
                                });
                                console.log(`✅ Webhook marked as processed for session: ${session.id}`);
                            });
                        } else {
                            console.error('❌ User not found with email:', customerEmail);
                        }
                    } else {
                        console.warn('⚠️ No credits to add or customer email missing');
                    }
                } else {
                    console.log(`⏳ Payment not completed yet. Status: ${fullSession.payment_status}`);
                }
            } catch (error: any) {
                console.error('❌ Error processing checkout session:', error);
                // Return 500 so Stripe will retry the webhook
                return NextResponse.json(
                    { error: 'Failed to process webhook' },
                    { status: 500 }
                );
            }
            break;

        default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}