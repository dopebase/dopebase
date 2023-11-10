import { list } from '../../../core/db'
import { formatTimestamp } from '../../../utils'

export const getHomeModules = async () => {
  const categories = await list('article_categories', {})

  const modules = []

  for (var i = 0; i < categories.length; ++i) {
    const category = categories[i]
    const articles = await list('articles', {
      where: { category_id: category.id },
      orderBy: 'created_at',
      limit: 3,
    })

    if (articles && articles.length > 0) {
      const articlePreviews = articles.map(article => ({
        title: article.title,
        content: article.content,
        photo: article.coverPhoto,
        slug: article.slug,
        categoryTitle: category.name,
        categoryPhoto: category.logoURL,
        publishedDate: formatTimestamp(article.createdAt),
      }))
      modules.push({
        title: category.name,
        slug: category.slug,
        articlePreviews: articlePreviews,
        summary: '',
      })
    }
  }

  return modules
}
