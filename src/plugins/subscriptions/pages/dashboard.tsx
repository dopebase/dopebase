import React from 'react'
import { getCurrentUser } from '../../../admin/utils/getCurrentUserByCookies'
import { findOne } from '../../../core/db'
import { CustomerDashboardContainer } from '../components/CustomerDashboardContainer'

// This gets called on successful return from Stripe payment
export default async function Page({ params, searchParams }) {
  const { routes } = params
  const user = await getCurrentUser()
  if (!user) {
    return <div>Access denied</div>
  }

  const subscriptions = await findOne('subscriptions', { user_id: user.id })

  return (
    <CustomerDashboardContainer>
      <div>This is the home page of a customer dashboard.</div>
      <div>User: {JSON.stringify(user)}</div>
      <div>Subscription: {JSON.stringify(subscriptions)}</div>
    </CustomerDashboardContainer>
  )
}
