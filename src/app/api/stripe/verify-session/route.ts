import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.nextUrl.searchParams.get('session_id');

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID is required' },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Parse items from metadata to get plan name
        let planName = null;
        if (session.metadata?.items) {
            try {
                const items = JSON.parse(session.metadata.items);
                planName = items[0]?.name || null;
            } catch (e) {
                console.error('Failed to parse items from metadata');
            }
        }

        return NextResponse.json({
            status: session.payment_status,
            planName: planName,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency,
        });
    } catch (error: any) {
        console.error('Session verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify session' },
            { status: 500 }
        );
    }
}