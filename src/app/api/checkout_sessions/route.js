import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'

export async function POST(req) {
  try {
    const body = await req.json(); 
    const { proposal_id, task_id, title, budget, freelancer_email, client_email } = body;

    const headersList = await headers()
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_BASE_URI || 'https://arrow-work.vercel.app'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Task: ${title}`,
            },
            unit_amount: Math.round(budget * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/dashboard/success?session_id={CHECKOUT_SESSION_ID}&proposal_id=${proposal_id}&task_id=${task_id}&freelancer_email=${freelancer_email}&client_email=${client_email}&amount=${budget}&title=${encodeURIComponent(title)}`,
      cancel_url: `${origin}/dashboard/client`,
    });

    return NextResponse.json({ url: session.url });
    
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 })
  }
}