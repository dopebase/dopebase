import {
  findOne,
  getOne,
  insertOne,
  list,
  updateOne,
} from '../../../../core/db'

export const getTagBySlug = async slug => {
  const tag = await findOne('article_tags', { slug })
  if (!tag) {
    return null
  }
  const articles = []
  return { ...tag, totalPages: 1, currentPage: 1, articles }
}
