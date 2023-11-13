import React from 'react'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '../../../admin/utils/getCurrentUserByCookies'
import { subscribe } from '../lib/subscriptions'
import { findOne } from '../../../core/db'

// This gets called on successful return from Stripe payment
export default async function Page({ params, searchParams }) {
  const { routes } = params
  const { plan_id } = searchParams
  const user = await getCurrentUser()
  if (!user || !plan_id) {
    return <div>Access denied</div>
  }

  const plan = await findOne('subscription_plans', { id: plan_id })
  if (!plan) {
    return <div>Invalid plan.</div>
  }

  const subscription = await subscribe(user.id, plan_id)
  if (subscription) {
    return redirect('/dashboard')
  }
}
