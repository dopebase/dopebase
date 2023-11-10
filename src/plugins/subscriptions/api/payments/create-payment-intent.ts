import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { generateResponse, getKeys, calculateOrderAmount } from '../../utils'

export async function POST(req) {
  console.log(`Creating payment intent`)

  const body = await req.json()
  console.log(body)

  const {
    email,
    items,
    price,
    currency,
    request_three_d_secure,
    payment_method_types = [],
    client = 'ios',
  }: {
    email: string
    items: string[]
    price: number
    currency: string
    payment_method_types: string[]
    request_three_d_secure: 'any' | 'automatic'
    client: 'ios' | 'android'
  } = body

  const { secret_key } = getKeys(payment_method_types[0])

  const stripe = new Stripe(secret_key as string, {
    apiVersion: '2023-08-16',
    typescript: true,
  })

  const customer = await stripe.customers.create({ email })
  // Create a PaymentIntent with the order amount and currency.
  const params: Stripe.PaymentIntentCreateParams = {
    amount: price,
    currency,
    customer: customer.id,
    payment_method_options: {
      card: {
        request_three_d_secure: request_three_d_secure || 'automatic',
      },
      sofort: {
        preferred_language: 'en',
      },
      wechat_pay: {
        app_id: 'wx65907d6307c3827d',
        client: client,
      },
    },
    payment_method_types: payment_method_types,
  }

  try {
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params)
    // Send publishable key and PaymentIntent client_secret to client.
    console.log(paymentIntent)
    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        customerId: paymentIntent.customer,
        intentId: paymentIntent.id,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.raw.message,
      },
      { status: 200 },
    )
  }
}
