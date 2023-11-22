import { getSettingsValue } from '../../../system/settings'
import { getCurrentTheme } from '../../../system/themes'
import { getArticleBySlug, getCategoryBySlug, getTagBySlug } from '../db'
import { getHomeModules } from './getHomeModules'

export const getComponentForRoutes = async routes => {
  console.log(`Finding component for routes 123 ${JSON.stringify(routes)}`)

  const installedTheme = await getCurrentTheme()
  const slug = routes.join('/')

  const blogURL = await getSettingsValue('blog_url')

  if (slug === blogURL) {
    // blog home page
    const modules = await getHomeModules()
    const src = `${installedTheme}/pages/blog/Home`
    try {
      const component = (await import(`../../../themes/` + src)).default
      return component({ modules: modules })
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

  const category = await getCategoryBySlug(slug)
  if (category) {
    const src = `${installedTheme}/pages/blog/SingleArticleCategory`
    try {
      const component = (await import(`../../../themes/` + src)).default
      return component({
        articleCategory: {
          name: category.name,
          slug: category.slug,
          seoTitle: category.seo_title,
          seoDescription: category.seo_description,
          aiSummary: category.ai_summary,
          aiLongDescription: category.ai_long_description,
          logoURL: category.logo_url,
          canonicalURL: category.canonical_url,
          totalPages: category.articles.length ?? 1,
          currentPage: 1,
          description: category.description,
          articles: category.articles,
        },
      })
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

  const tag = await getTagBySlug(slug)
  if (tag) {
    const src = `${installedTheme}/pages/blog/SingleArticleTag`
    try {
      const component = (await import(`../../../themes/` + src)).default
      return component({ articleTag: tag })
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
