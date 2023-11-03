import { getCurrentTheme } from '../../../system/themes'
import { getArticleBySlug } from '../db'

export const getComponentForRoutes = async routes => {
  console.log(`Finding component for routes ${JSON.stringify(routes)}`)

  const slug = routes.join('/')
  const installedTheme = await getCurrentTheme()
  const article = await getArticleBySlug(slug)
  if (article) {
    const src = `${installedTheme}/pages/blog/SingleArticle`
    try {
      const component = (await import(`../../../themes/` + src)).default
      return component({ article: article })
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
  return <div>Article with slug {slug} does not exist</div>
}
