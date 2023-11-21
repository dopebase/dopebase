/*
 ** Blog seeder - Generates hundreds of articles based on a topic, using OpenAI's GPT
 */
import {
  generateArticle,
  generateIdeaStructure,
} from '../articles/generateArticle'
import { generateText2Text } from '../../../../../system/ml'
import {
  persistArticle,
  persistArticleIdea,
  completeArticle,
} from '../articles/persistArticle'
import { findOne, list, updateOne } from '../../../../../core/db'

export const generateArticleIdeas = async originalPrompt => {
  try {
    const prompt = `${originalPrompt}. Return only valid JSON with a titles field only`
    const completion = await generateText2Text(prompt, 13000, 0.3)
    console.log('Title Ideas:')
    console.log(JSON.stringify(completion.data))
    const generatedContent = completion.data.choices[0].message.content

    console.log(generatedContent)
    const ideas = JSON.parse(generatedContent).titles
    console.log(ideas)
    return ideas
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

/*
 * Generate a list of article ideas for a topic, including metadata for each article - it populates the article_ideas table in the db
 */
export const seedArticleIdeas = async (ideasPrompt, topic, categoryTitle) => {
  const ideas = await generateArticleIdeas(ideasPrompt) // list of strings
  for (const title of ideas) {
    const structure = await generateIdeaStructure(title, topic)
    await persistArticleIdea(structure, topic, categoryTitle)
  }
  return ideas
}

/*
 * It reads ideas from article_ideas table and generates articles for each idea. It stores the article in articles table, and removes idea from article_ideas table once completed
 */
export const seedArticles = async () => {
  const ideas = await list('article_ideas', {
    where: {
      status: 'not_started',
    },
  })
  console.log(`Seeding ${ideas.length} articles`)
  const titles = ideas.map(i => i.title)
  for (const idea of ideas) {
    const {
      title,
      topic,
      category,
      sections,
      slug,
      tags,
      seoDescription,
      summary,
      tweet,
    } = idea
    const existingArticle = await findOne('articles', { slug: slug })

    if (existingArticle) {
      console.log(
        `Article ${slug} already exists - looking at tags, then marking as completed`,
      )
      await completeArticle(existingArticle, JSON.parse(tags), topic)
      await updateOne('article_ideas', idea.id, { status: 'completed' })
      continue
    }
    const sectionsObject = JSON.parse(sections)
    const tagsObject = JSON.parse(tags)

    const { content, coverURL, aiPrompt } = await generateArticle(
      title,
      topic,
      sectionsObject,
      slug,
    )

    const id = await persistArticle(
      {
        title,
        sections: sectionsObject,
        content,
        tags: tagsObject,
        seoDescription,
        summary,
        tweet,
        slug,
        coverURL,
        aiPrompt,
      },
      topic,
      category,
      titles,
    )
    console.log(`Article ${slug} created with id ${id}`)
    await updateOne('article_ideas', idea.id, { status: 'completed' })
  }
  return ideas
}
