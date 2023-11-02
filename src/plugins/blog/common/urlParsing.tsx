import { getCurrentTheme } from '../../../system/themes'
import { getArticleBySlug } from '../db'
import SingleArticle from '../../../themes/classic/pages/blog/SingleArticle'
import Sex from '../../../themes/classic/pages/blog/Sex'

export const getComponentForRoutes = async routes => {
  console.log(`Finding component for routes ${JSON.stringify(routes)}`)

  const slug = routes.join('/')
  const installedTheme = await getCurrentTheme()
  const article = await getArticleBySlug(slug)
  if (article) {
    // const src = `${process.cwd()}/src/themes/${installedTheme}/pages/blog/SingleArticle`
    const src = `../../../themes/classic/pages/blog/Sex`

    try {
      // console.log(Sex)
      // return <SingleArticle article={article} />
      // return <div>yes</div>
      const component = (await import(src)).default
      return <component article={article} />
    } catch (error) {
      console.log(error)
      return (
        <div>
          Your theme ({installedTheme}) does not support this route powered by
          the blog plugin. Make sure {src} is implemented in your theme.
        </div>
      )
    }
  }
  return <div>Article with slug {slug} does not exist</div>
}
