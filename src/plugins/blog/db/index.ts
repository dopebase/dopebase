import { findOne, getOne, insertOne, list, updateOne } from '../../../core/db'

export const getArticleBySlug = async slug => {
  const article = await findOne('articles', { slug })
  if (!article) {
    return null
  }
  const category = article?.category_id
    ? await getOne('article_categories', article.category_id)
    : null
  const tags = []
  return { ...article, category, tags }
}

export const getCategoryBySlug = async slug => {
  const category = await findOne('article_categories', { slug })
  if (!category) {
    return null
  }
  const tags = []
  const articles = await list('articles', {
    where: { category_id: category.id },
  })
  return { ...category, articles, tags }
}

export const getTagBySlug = async slug => {
  const tag = await findOne('article_tags', { slug })
  if (!tag) {
    return null
  }
  const tags = []
  const articles = []
  return { ...tag }
}
