import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { Product } from '@/types';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
    try {
        const { userId: userClerkId } = await auth();

        if (!userClerkId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userClerkId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { item }: { item: Product } = await req.json();

        if (!item) {
            return NextResponse.json({ error: 'No item provided' }, { status: 400 });
        }

        // Search for existing product by name and app metadata
        const existingProducts = await stripe.products.search({
            query: `name:"${item.name}" AND metadata["app"]:"imaginify"`,
        });

        let product: Stripe.Product;
        if (existingProducts.data.length > 0) {
            product = existingProducts.data[0];
            console.log(`Found existing product ID: ${product.id}`);

            if (!product.active) {
                try {
                    await stripe.products.update(product.id, {
                        active: true,
                    });
                    console.log(`Activated product ID: ${product.id}`);
                } catch (error: any) {
                    if (error.type === 'StripeInvalidRequestError' && error.message.includes('cannot be updated')) {
                        console.log(`Product ${product.id} is Stripe-managed and cannot be updated. Creating new product.`);
                        product = await stripe.products.create({
                            name: `${item.name} (${new Date().toISOString().split('T')[0]})`,
                            description: item.description,
                            metadata: { credits: item.credits.toString(), app: 'imaginify' },
                            active: true,
                        });
                        console.log(`Created new product ID: ${product.id}`);
                    } else {
                        throw error;
                    }
                }
            }
        } else {
            product = await stripe.products.create({
                name: item.name,
                description: item.description,
                metadata: { credits: item.credits.toString(), app: 'imaginify' },
                active: true,
            });
            console.log(`Created new product ID: ${product.id}`);
        }
        console.log("🚀 ~ POST ~ product:", product);

        // List active prices for the product
        const existingPrices = await stripe.prices.list({
            product: product.id,
            active: true,
            currency: 'usd',
        });

        // Find a price with matching unit_amount
        let price: Stripe.Price;
        const matchingPrice = existingPrices.data.find(
            (p) => p.unit_amount === Math.round(item.price * 100)
        );

        if (matchingPrice) {
            price = matchingPrice;
            console.log(`Using existing price ID: ${price.id}`);
        } else {
            price = await stripe.prices.create({
                product: product.id,
                unit_amount: Math.round(item.price * 100),
                currency: 'usd',
            });
            console.log(`Created price ID: ${price.id}`);
        }
        console.log("🚀 ~ POST ~ price:", price);

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            line_items: [
                {
                    price: price.id,
                    quantity: item.quantity || 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/credits`,
            metadata: {
                userId: user.id,
                clerkId: userClerkId,
                items: JSON.stringify([item]),
            },
            client_reference_id: `${user.id}-${item.id}-${Date.now()}`,
        });

        // Return the session URL instead of just the ID
        return NextResponse.json({
            id: session.id,
            url: session.url
        });
    } catch (error: any) {
        console.error('Stripe Checkout Session error:', {
            message: error.message,
            type: error.type,
            code: error.code,
            param: error.param,
            statusCode: error.statusCode,
            requestId: error.requestId,
        });
        return NextResponse.json(
            { error: error?.message || 'Failed to create Checkout Session' },
            { status: 500 }
        );
    }
}