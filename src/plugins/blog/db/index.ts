import { findOne, getOne, insertOne, list, updateOne } from '../../../core/db'

export const getArticleBySlug = async slug => {
  const article = await findOne('articles', { slug })
  if (!article) {
    return null
  }
  const category = article?.category_id
    ? await getOne('article_categories', article.category_id)
    : null
  var tags = []
  for (var i = 0; i < article.tags.length; i++) {
    const tag = await getOne('article_tags', article.tags[i])
    tags.push(tag)
  }
  return { ...article, category, tags }
}

export const getCategoryBySlug = async slug => {
  const category = await findOne('article_categories', { slug })
  if (!category) {
    return null
  }
  const articles = await list('articles', {
    where: { category_id: category.id },
  })
  return { ...category, articles }
}
export { getTagBySlug } from './firebase/getTagBySlug'
