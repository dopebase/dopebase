import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getKeys } from '../../utils'

export async function POST(req) {
  console.log(`Creating payment intent`)

  const body = await req.json()
  console.log(body)

  const {
    email,
    payment_method_types = [],
  }: { email: string; payment_method_types: string[] } = body
  const { secret_key } = getKeys(payment_method_types[0])

  const stripe = new Stripe(secret_key as string, {
    apiVersion: '2023-08-16',
    typescript: true,
  })
  const customer = await stripe.customers.create({ email })

  const payPalIntentPayload = {
    return_url: 'https://example.com/setup/complete',
    payment_method_options: { paypal: { currency: 'eur' } },
    payment_method_data: { type: 'paypal' },
    mandate_data: {
      customer_acceptance: {
        type: 'online',
        online: {
          ip_address: '1.1.1.1',
          user_agent: 'test-user-agent',
        },
      },
    },
    confirm: true,
  }

  //@ts-ignore
  const setupIntent = await stripe.setupIntents.create({
    ...{ customer: customer.id, payment_method_types },
    ...(payment_method_types?.includes('paypal') ? payPalIntentPayload : {}),
  })

  // Send publishable key and SetupIntent details to client
  return NextResponse.json(
    {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      clientSecret: setupIntent.client_secret,
      id: setupIntent.id,
      customerId: setupIntent.customer,
    },
    { status: 200 },
  )
}
