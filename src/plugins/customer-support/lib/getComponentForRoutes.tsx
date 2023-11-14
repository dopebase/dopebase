import { getSettingsValue } from '../../../system/settings'
import { getCurrentTheme } from '../../../system/themes'

export const getComponentForRoutes = async (routes, searchParams) => {
  console.log(
    `Finding component for routes in customerSupport plugin ${JSON.stringify(
      routes,
    )}`,
  )

  if ((routes?.length ?? 0) === 0) {
    return null
  }

  const installedTheme = await getCurrentTheme()
  const slug = routes.join('/')

  const contactFormURL = await getSettingsValue('contact_form_url')
  if (slug === contactFormURL) {
    // subscriptions home page
    const src = `${installedTheme}/pages/contact/ContactPage`
    try {
      const component = (await import(`../../../themes/` + src)).default
      return component({})
    } catch (error) {
      console.log(error)
      return (
        <div>
          Your theme ({installedTheme}) does not support this route powered by
          the customerSupport plugin. Make sure {src} is implemented in your
          theme and has no errors.
        </div>
      )
    }
  }

  return null
}
