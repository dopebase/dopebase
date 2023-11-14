import { cookies } from 'next/headers'
import { getCurrentUserByCookies } from '../../../admin/utils/getCurrentUserByCookies'
import { findOne, insertOne, list } from '../../../core/db'

export const getActiveSubscription = async () => {
  const user = await getCurrentUserByCookies(cookies())
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

export const subscribe = async (userID: string, planID: string) => {
  // subscribe user to plan
  const subscription = await findOne('subscriptions', {
    user_id: userID,
    plan_id: planID,
  })
  if (subscription) {
    return subscription
  }

  const startDate = Math.floor(new Date().getTime() / 1000).toString()
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + 30)
  let endDate = Math.floor(currentDate.getTime() / 1000).toString()
  const newSubscription = await insertOne('subscriptions', {
    user_id: userID,
    plan_id: planID,
    status: 'active',
    start_date: startDate,
    end_date: endDate,
    last_payment_date: startDate,
    next_billing_date: endDate,
    created_at: startDate,
    updated_at: startDate,
  })
  return newSubscription
}
