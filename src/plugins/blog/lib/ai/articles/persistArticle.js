import { generateArticleCategory } from './generateArticleCategory'
import { randomDate } from '../../../../../utils/date'
import { generateArticleTag } from './generateArticleTag'
import { findOne, insertOne } from '../../../../../core/db'
import { websiteURL } from '../../../../../config/config'

const getOrGenerateArticleTag = async (tagName, topic, articleTitle) => {
  const tag = await findOne('article_tags', { name: tagName })
  if (tag) {
    return tag
  }

  const {
    seoTitle,
    seoDescription,
    summary,
    tweet,
    slug,
    longDescription,
    aiPrompt,
  } = await generateArticleTag(tagName, topic, articleTitle)

  const dateStr = Math.floor(new Date().getTime() / 1000).toString()
  const tagBySlug = await findOne('article_tags', { slug: slug })

  if (tagBySlug) {
    return tagBySlug
  }
  const newTag = await insertOne('article_tags', {
    name: tagName,
    slug: slug,
    description: summary,
    seo_title: seoTitle,
    seo_description: seoDescription,
    published: true,
    canonical_url: `${websiteURL}${slug}`,
    created_at: dateStr,
    ai_summary: summary,
    ai_long_description: longDescription,
    ai_social_post: tweet,
    ai_prompt: aiPrompt,
    ai_generated: true,
  })
  console.log(`inserted tag named '${tagName}'`)
  return newTag
}

const getOrGenerateCategory = async (categoryName, topic, articleTitles) => {
  const category = await findOne('article_categories', { name: categoryName })
  if (category) {
    return category
  }
  const {
    seoTitle,
    seoDescription,
    summary,
    tweet,
    slug,
    longDescription,
    aiPrompt,
  } = await generateArticleCategory(categoryName, topic, articleTitles)

  const categoryBySlug = await findOne('article_categories', { slug: slug })

  if (categoryBySlug) {
    return categoryBySlug
  }

  const d = randomDate(new Date(2023, 0, 1), new Date())
  const dateStr = Math.floor(d.getTime() / 1000).toString()

  const newCategory = await insertOne('article_categories', {
    name: categoryName,
    slug: slug,
    description: summary,
    seo_title: seoTitle,
    seo_description: seoDescription,
    published: true,
    canonical_url: `${websiteURL}${slug}`,
    created_at: dateStr,
    ai_summary: summary,
    ai_long_description: longDescription,
    ai_social_post: tweet,
    ai_prompt: aiPrompt,
    ai_generated: true,
  })
  console.log(`inserted category named '${categoryName}'`)
  return newCategory
}

const persistArticleToDB = async (
  {
    title,
    sections,
    content,
    tags,
    seoDescription,
    summary,
    slug,
    coverURL,
    aiPrompt,
    aiSocialPost,
  },
  topic,
  categoryTitle,
  articleIdeas,
) => {
  const keyword = slug.replace(/-/g, ' ')

  const category = await getOrGenerateCategory(
    categoryTitle,
    topic,
    articleIdeas,
  )

  const categoryID = category.id

  const d = randomDate(new Date(2023, 0, 1), new Date())
  const dateStr = Math.floor(d.getTime() / 1000).toString()

  if (categoryID?.length > 0) {
    const article = await insertOne('articles', {
      title: title,
      slug: slug,
      seo_title: title,
      seo_keyword: keyword,
      seo_description: seoDescription,
      content: content,
      category_id: categoryID,
      canonical_url: `${websiteURL}${slug}`,
      created_at: dateStr,
      updated_at: dateStr,
      published: true,
      cover_photo: coverURL,
      ai_prompt: aiPrompt,
      ai_content: content,
      ai_sections: sections.join('\n'),
      ai_seo_description: seoDescription,
      ai_summary: summary,
      ai_tags: tags.join(','),
      ai_social_post: aiSocialPost,
      ai_generated: true,
    })
    console.log(`inserted article titled '${title}'`)
    // let's do tags now
    for (const tagName of tags) {
      const tag = await getOrGenerateArticleTag(tagName, topic, title)
      const tagID = tag.id
      if (tagID?.length > 0) {
        // TODO: insert all tag-article relationships into db
        console.log(`tagged article to '${tagName}'`)
      }
    }

    return article
  } else {
    console.error(
      `No category found for article ${title} categoryTitle: ${categoryTitle}`,
    )
    return null
  }
}

export const persistArticle = async (
  article,
  topic,
  categoryTitle,
  articleIdeas,
) => {
  const { slug } = article
  const { id } = await persistArticleToDB(
    article,
    topic,
    categoryTitle,
    articleIdeas,
  )
  console.log(`Article ${websiteURL}${slug} persisted. ID: ${id}`)
  return id
}

export const persistArticleIdea = async (
  { title, sections, tags, seoDescription, summary, tweet, slug },
  topic,
  category,
) => {
  const dateStr = Math.floor(new Date().getTime() / 1000).toString()

  await insertOne('article_ideas', {
    title,
    sections: JSON.stringify(sections),
    tags: JSON.stringify(tags),
    seo_description: seoDescription,
    summary,
    social_media_post: tweet,
    slug,
    topic,
    category,
    status: 'not_started',
    extra_prompt: '',
    created_at: dateStr,
    updated_at: dateStr,
  })
}

// Article already exists, but some tags might not be set
export const completeArticle = async (article, tags, topic) => {
  for (const tagName of tags) {
    const tag = await getOrGenerateArticleTag(tagName, topic, article.title)
    const tagID = tag.id
    if (tagID?.length > 0) {
      // TODO: insert all tag-article relationships into db
      // await prisma.article.update({
      //   where: {
      //     id: article.id,
      //   },
      //   data: {
      //     tags: {
      //       connect: {
      //         id: tagID,
      //       },
      //     },
      //   },
      // })
      console.log(`tagged article to '${tagName}'`)
    }
  }

  return {}
}
