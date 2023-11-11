import type Stripe from 'stripe'

const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export const generateResponse = (
  intent: Stripe.PaymentIntent,
):
  | {
      clientSecret: string | null
      requiresAction: boolean
      status: string
    }
  | { clientSecret: string | null; status: string }
  | { error: string } => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case 'requires_action':
      // Card requires authentication
      return {
        clientSecret: intent.client_secret,
        requiresAction: true,
        status: intent.status,
      }
    case 'requires_payment_method':
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: 'Your card was denied, please provide a new payment method',
      }
    case 'succeeded':
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log('💰 Payment received!')
      return { clientSecret: intent.client_secret, status: intent.status }
  }

  return {
    error: 'Failed',
  }
}

// tslint:disable-next-line: interface-name
export const itemIdToPrice: { [id: string]: number } = {
  'id-1': 1400,
  'id-2': 2000,
  'id-3': 3000,
  'id-4': 4000,
  'id-5': 5000,
}

export const calculateOrderAmount = (itemIds: string[] = ['id-1']): number => {
  const total = itemIds
    .map(id => itemIdToPrice[id])
    .reduce((prev, curr) => prev + curr, 0)

  return total
}

export function getKeys(payment_method?: string) {
  let secret_key: string | undefined = stripeSecretKey
  let publishable_key: string | undefined = stripePublishableKey

  switch (payment_method) {
    case 'grabpay':
    case 'fpx':
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_MY
      secret_key = process.env.STRIPE_SECRET_KEY_MY
      break
    case 'au_becs_debit':
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_AU
      secret_key = process.env.STRIPE_SECRET_KEY_AU
      break
    case 'oxxo':
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_MX
      secret_key = process.env.STRIPE_SECRET_KEY_MX
      break
    case 'wechat_pay':
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_WECHAT
      secret_key = process.env.STRIPE_SECRET_KEY_WECHAT
      break
    case 'paypal':
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_UK
      secret_key = process.env.STRIPE_SECRET_KEY_UK
      break
    default:
      publishable_key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      secret_key = process.env.STRIPE_SECRET_KEY
  }

  return { secret_key, publishable_key }
}
