import { cookies } from 'next/headers'
import { getCurrentUserByCookies } from '../../../admin/utils/getCurrentUserByCookies'
import { findOne, list } from '../../../core/db'

export const getActiveSubscription = async () => {
  const user = await getCurrentUserByCookies(cookies())
  console.log(`Retrieved user by cookies: ${JSON.stringify(user)}`)
  if (!user) {
    return null
  }
  const subscriptions = await list('subscriptions', {
    where: { user_id: user.id, status: 'active' },
  })
  console.log(`Retrieved subscriptions: ${JSON.stringify(subscriptions)}`)
  if (subscriptions.length === 0) {
    return null
  }
  const subscription = subscriptions[0]
  const plan = await findOne('subscription_plans', { id: subscription.plan_id })
  if (!plan) {
    return null
  }
  return { ...subscription, plan }
}

export const getActivePlans = async () => {
  const plans = await list('subscription_plans', {})
  return plans
}
