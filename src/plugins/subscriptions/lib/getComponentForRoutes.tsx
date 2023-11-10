import { getSettingsValue } from '../../../system/settings'
import { getCurrentTheme } from '../../../system/themes'

export const getComponentForRoutes = async routes => {
  console.log(`Finding component for routes ${JSON.stringify(routes)}`)

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

  return null
}
