import { findOne, getOne, insertOne, list, updateOne } from '../../../core/db'

export const getArticleBySlug = async slug => {
  const article = await findOne('articles', { slug })
  const category = await getOne('article_categories', article.category_id)
  const tags = []
  return { ...article, category, tags }
}
