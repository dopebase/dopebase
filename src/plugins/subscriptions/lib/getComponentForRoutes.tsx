import { getSettingsValue } from '../../../system/settings'
import { getCurrentTheme } from '../../../system/themes'

export const getComponentForRoutes = async (routes, searchParams) => {
  console.log(`Finding component for routes ${JSON.stringify(routes)}`)

  if ((routes?.length ?? 0) === 0) {
    return null
  }

  const installedTheme = await getCurrentTheme()
  const slug = routes.join('/')

  const subscriptionsURL = await getSettingsValue(
    'subscriptions_management_url',
  )
  if (slug === subscriptionsURL) {
    // subscriptions home page
    const src = `${installedTheme}/pages/subscriptions/Management`
    try {
      const component = (await import(`../../../themes/` + src)).default
      return component({})
    } catch (error) {
      console.log(error)
      return (
        <div>
          Your theme ({installedTheme}) does not support this route powered by
          the blog plugin. Make sure {src} is implemented in your theme and has
          no errors.
        </div>
      )
    }
  }

  if (routes[0] === 'subscribe') {
    // subscriptions home page
    try {
      const component = (await import(`../pages/subscribe`)).default
      return component({ params: { routes }, searchParams: searchParams })
    } catch (error) {
      console.log(error)
      return <div>Subscribe page not set in plugin subscriptions.</div>
    }
  }

  if (routes[0] === 'dashboard' && routes[1] === 'edit-profile') {
    // subscriptions home page
    try {
      const component = (await import(`../pages/editProfile`)).default
      return component({ params: { routes }, searchParams: searchParams })
    } catch (error) {
      console.log(error)
      return <div>Edit profile page not set in plugin subscriptions.</div>
    }
  }

  if (routes[0] === 'dashboard' && routes[1] === 'subscriptions') {
    // subscriptions home page
    try {
      const component = (await import(`../pages/manageSubscriptions`)).default
      return component({ params: { routes }, searchParams: searchParams })
    } catch (error) {
      console.log(error)
      return (
        <div>manageSubscriptions page not set in plugin subscriptions.</div>
      )
    }
  }

  if (routes[0] === 'dashboard') {
    // subscriptions home page
    try {
      const component = (await import(`../pages/dashboard`)).default
      return component({ params: { routes }, searchParams: searchParams })
    } catch (error) {
      console.log(error)
      return <div>Subscribe page not set in plugin subscriptions.</div>
    }
  }

  return null
}
