import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const evt = await verifyWebhook(req)
        console.log("🚀 ~ POST ~type of evt:", evt.type)

        if (evt.type === 'user.created') {
            const { id: clerkId, email_addresses, first_name, last_name, username } = evt.data
            const email = email_addresses[0]?.email_address || ''
            const name = username || [first_name, last_name].filter(Boolean).join(' ')

            await prisma.user.create({
                data: {
                    clerkId,
                    email,
                    name,
                    creditsAvailable: 10,
                    imageManipulationsDone: 0,
                },
            })

            console.log("🚀 ~ POST ~✅ User created:", clerkId)

        } else if (evt.type === 'user.updated') {
            const { id: clerkId, email_addresses, first_name, last_name, username } = evt.data
            const email = email_addresses[0]?.email_address || ''
            const name = username || [first_name, last_name].filter(Boolean).join(' ')

            await prisma.user.update({
                where: { clerkId },
                data: {
                    email,
                    name,
                },
            })

            console.log("🚀 ~ POST ~✅ User updated:", clerkId)

        }

        return NextResponse.json({ received: true })
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new NextResponse('Error verifying webhook', { status: 400 })
    }
}

