import Stripe from 'stripe'
import { getKeys } from '../../utils'
import { websiteURL } from '../../../../config/config'
import { getAuthenticatedUser } from '../../../../admin/utils/getAuthenticatedUser'

export async function POST(req: Request) {
  console.log('eeeeeee')
  if (req.method === 'POST') {
    // 1. Destructure the price and quantity from the POST body
    const { price, quantity = 1, metadata = {} } = await req.json()

    const { secret_key } = getKeys()

    const stripe = new Stripe(secret_key as string, {
      apiVersion: '2023-08-16',
      typescript: true,
    })

    try {
      // 2. Get the user from Supabase auth
      const user = await getAuthenticatedUser(req)
      if (!user) {
        return new Response(
          JSON.stringify({
            error: { statusCode: 401, message: 'Unauthorized' },
          }),
          { status: 401 },
        )
      }
      const { email } = user
      // 3. Retrieve or create the customer in Stripe
      const customers = await stripe.customers.list({
        email: email,
      })

      let customer = customers.data[0]

      console.log(
        `Creating checkout session for Customer: ${JSON.stringify(customer)}`,
      )

      if (!customer) {
        customer = await stripe.customers.create({ email: email })
      }

      // 4. Create a checkout session in Stripe
      let session
      if (price.type === 'recurring') {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          billing_address_collection: 'required',
          customer,
          customer_update: {
            address: 'auto',
          },
          line_items: [
            {
              price: price.id,
              quantity,
            },
          ],
          mode: 'subscription',
          allow_promotion_codes: true,
          subscription_data: {
            trial_from_plan: true,
            metadata,
          },
          success_url: `${websiteURL}/account`,
          cancel_url: `${websiteURL}/`,
        })
      } else if (price.type === 'one_time') {
        session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          billing_address_collection: 'required',
          customer,
          customer_update: {
            address: 'auto',
          },
          line_items: [
            {
              price: price.id,
              quantity,
            },
          ],
          mode: 'payment',
          allow_promotion_codes: true,
          success_url: `${websiteURL}/account`,
          cancel_url: `${websiteURL}/`,
        })
      }

      if (session) {
        return new Response(JSON.stringify({ sessionId: session.id }), {
          status: 200,
        })
      } else {
        return new Response(
          JSON.stringify({
            error: { statusCode: 500, message: 'Session is not defined' },
          }),
          { status: 500 },
        )
      }
    } catch (err: any) {
      console.log(err)
      return new Response(JSON.stringify(err), { status: 500 })
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405,
    })
  }
}
