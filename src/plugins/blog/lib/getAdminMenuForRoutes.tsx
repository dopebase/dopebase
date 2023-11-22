import { getSettingsValue } from '../../../system/settings'
import { getArticleBySlug, getCategoryBySlug, getTagBySlug } from '../db'

export const getAdminMenuForRoutes = async routes => {
  console.log(`Finding component for routes ${JSON.stringify(routes)}`)

  const slug = routes.join('/')
  const blogURL = await getSettingsValue('blog_url')

  if (slug === blogURL) {
    return []
  }

  const article = await getArticleBySlug(slug)
  if (article) {
    return [
      {
        title: 'Edit Article',
        path: './plugins/blog/articles/update?id=' + article.id,
        icon: 'pencil',
      },
    ]
  }

  const category = await getCategoryBySlug(slug)
  if (category) {
    return [
      {
        title: 'Edit Category',
        path: './plugins/blog/article_categories/update?id=' + category.id,
        icon: 'pencil',
      },
    ]
  }

  const tag = await getTagBySlug(slug)
  if (tag) {
    return [
      {
        title: 'Edit Tag',
        path: './plugins/blog/article_tags/update?id=' + tag.id,
        icon: 'pencil',
      },
    ]
  }

  return []
}
