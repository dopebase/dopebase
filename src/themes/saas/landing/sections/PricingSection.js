import {
  getActivePlans,
  getActiveSubscription,
} from '../../../../plugins/subscriptions/lib/subscriptions'
import { getCurrentUser } from '../../../../admin/utils/getCurrentUserByCookies'
import Pricing from './Pricing'

export default async function PricingSection() {
  const [user, subscription, plans] = await Promise.all([
    getCurrentUser(),
    getActiveSubscription(),
    getActivePlans(),
  ])

  return <Pricing user={user} subscription={subscription} plans={plans} />
}
