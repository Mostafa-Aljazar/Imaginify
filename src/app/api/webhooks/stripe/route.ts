import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import Stripe from 'stripe';

// Credit amounts for each plan
const CREDIT_PACKAGES = {
    'Pro Package': 120,
    'Premium Package': 2000,
} as const;

export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'No signature provided' },
            { status: 400 }
        );
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json(
            { error: 'Webhook secret not configured' },
            { status: 500 }
        );
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
        return NextResponse.json(
            { error: `Webhook Error: ${error.message}` },
            { status: 400 }
        );
    }

    console.log('🚀 Webhook event received:', event.type);

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('✅ Payment successful:', session.id);
            console.log('Customer email:', session.customer_details?.email);

            try {
                // Parse items from metadata to get plan details
                if (session.metadata?.items) {
                    const items = JSON.parse(session.metadata.items);
                    const planName = items[0]?.name as keyof typeof CREDIT_PACKAGES;
                    const customerEmail = session.customer_details?.email;

                    console.log('📦 Plan purchased:', planName);
                    console.log('💳 Credits to add:', CREDIT_PACKAGES[planName]);

                    if (customerEmail && planName && CREDIT_PACKAGES[planName]) {
                        // Find user by email and update credits
                        const user = await prisma.user.findUnique({
                            where: { email: customerEmail },
                        });

                        if (user) {
                            const creditsToAdd = CREDIT_PACKAGES[planName];

                            // Update user credits
                            const updatedUser = await prisma.user.update({
                                where: { email: customerEmail },
                                data: {
                                    creditsAvailable: {
                                        increment: creditsToAdd,
                                    },
                                },
                            });

                            console.log('✅ Credits added successfully!');
                            console.log(`User ${updatedUser.email} now has ${updatedUser.creditsAvailable} credits`);
                        } else {
                            console.error('❌ User not found with email:', customerEmail);
                            // Optionally create a new user here
                            // const newUser = await prisma.user.create({ ... });
                        }
                    }
                }
            } catch (error) {
                console.error('❌ Error processing payment:', error);
            }
            break;

        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('✅ PaymentIntent succeeded:', paymentIntent.id);
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object as Stripe.PaymentIntent;
            console.log('❌ Payment failed:', failedPayment.id);
            break;

        default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}