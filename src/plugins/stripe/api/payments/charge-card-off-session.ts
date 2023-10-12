import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getKeys } from '../../utils'

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY || ''

export async function POST(req) {
  console.log(`Charging customer`)

  const body = await req.json()
  console.log(body)
  let paymentIntent, customer

  const { amount, email, paymentMethodId, currency } = body

  console.log(`Payment method id: ${paymentMethodId}`)
  console.log(`Amount: ${amount}`)
  console.log(`Currency: ${currency}`)
  console.log(`Email: ${email}`)

  const { secret_key } = getKeys()

  const stripe = new Stripe(secret_key as string, {
    apiVersion: '2023-08-16',
    typescript: true,
  })

  try {
    // You need to attach the PaymentMethod to a Customer in order to reuse
    // Since we are using test cards, create a new Customer here
    // You would do this in your payment flow that saves cards
    const customers = await stripe.customers.list({
      email: email,
    })

    customer = customers.data[0]

    console.log(`Customer: ${JSON.stringify(customer)}`)

    if (!customer) {
      customer = await stripe.customers.create({ email: email })
    }

    // List the customer's payment methods to find one to charge
    // const paymentMethods = await stripe.paymentMethods.list({
    //   customer: customer.id,
    //   type: 'card',
    // })

    // Create and confirm a PaymentIntent with the order amount, currency,
    // Customer and PaymentMethod ID
    paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method: paymentMethodId,
      customer: customer.id,
      off_session: true,
      confirm: true,
    })

    console.log(
      `Customer ${customer.id} has been charged ${currency}${amount} successfully`,
    )

    return NextResponse.json(
      {
        succeeded: true,
        clientSecret: paymentIntent.client_secret,
        publicKey: stripePublishableKey,
      },
      { status: 200 },
    )
  } catch (err: any) {
    if (err.code === 'authentication_required') {
      // Bring the customer back on-session to authenticate the purchase
      // You can do this by sending an email or app notification to let them know
      // the off-session purchase failed
      // Use the PM ID and client_secret to authenticate the purchase
      // without asking your customers to re-enter their details
      return NextResponse.json(
        {
          error: 'authentication_required',
          paymentMethod: err.raw.payment_method.id,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: stripePublishableKey,
          amount: amount,
          card: {
            brand: err.raw.payment_method.card.brand,
            last4: err.raw.payment_method.card.last4,
          },
        },
        { status: 200 },
      )
    } else if (err.code) {
      // The card was declined for other reasons (e.g. insufficient funds)
      // Bring the customer back on-session to ask them for a new payment method
      return NextResponse.json(
        {
          error: err.code,
          clientSecret: err.raw.payment_intent.client_secret,
          publicKey: stripePublishableKey,
        },
        { status: 200 },
      )
    } else {
      console.log('Unknown error occurred', err)
      return NextResponse.json({}, { status: 500 })
    }
  }
}
