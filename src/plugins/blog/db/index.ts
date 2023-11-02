import { findOne, getOne, insertOne, list, updateOne } from '../../../core/db'

export const getArticleBySlug = async slug => {
  const article = await findOne('articles', { slug })
  const category = article?.category_id
    ? await getOne('article_categories', article.category_id)
    : null
  const tags = []
  return { ...article, category, tags }
}
