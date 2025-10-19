import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// Define Product type
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}

export async function POST(req: NextRequest) {
    try {
        // Get authenticated user from Clerk
        const { userId: userClerkId } = await auth();

        if (!userClerkId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user from database to get email
        const user = await prisma.user.findUnique({
            where: { clerkId: userClerkId },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        const { items }: { items: Product[] } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: 'No items provided' },
                { status: 400 }
            );
        }

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email, // Pre-fill customer email
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        description: item.description,
                    },
                    unit_amount: Math.round(item.price * 100), // Convert to cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/pricing`,
            metadata: {
                items: JSON.stringify(items),
                userId: user.id,
                clerkId: userClerkId,
            },
        });

        // Return the session URL for client-side redirect
        return NextResponse.json({
            id: session.id,
            url: session.url,
        });
    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: error?.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}