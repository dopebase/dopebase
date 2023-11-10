import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getKeys } from '../../utils'

export async function POST(req) {
  console.log(`Payment sheet request`)

  const body = await req.json()
  console.log(body)

  const { secret_key } = getKeys()
  const { price, currency, customerId } = body

  const stripe = new Stripe(secret_key as string, {
    apiVersion: '2023-08-16',
    typescript: true,
  })

  const customer = await stripe.customers.retrieve(customerId)
  if (!customer) {
    return NextResponse.json(
      {
        error: 'You have no customer created',
      },
      { status: 200 },
    )
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2023-08-16' },
  )
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseFloat(price),
    currency: currency,
    customer: customer.id,
    // Edit the following to support different payment methods in your PaymentSheet
    // Note: some payment methods have different requirements: https://stripe.com/docs/payments/payment-methods/integration-options
    payment_method_types: [
      'card',
      // 'ideal',
      // 'sepa_debit',
      // 'sofort',
      // 'bancontact',
      // 'p24',
      // 'giropay',
      // 'eps',
      // 'afterpay_clearpay',
      // 'klarna',
      // 'us_bank_account',
    ],
  })
  return NextResponse.json(
    {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    },
    { status: 200 },
  )
}
