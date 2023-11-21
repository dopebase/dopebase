import { generateText2Text } from '../../../../../system/ml'

const generateCategoryMetadata = async (
  topic,
  categoryTitle,
  articleTitleString,
) => {
  try {
    const prompt = `Generate seoTitle, seoDescription, summary, tweet, longDescription for an article category page named "${categoryTitle}" on a blog about ${topic}
     Return response in valid JSON format with a {seoTitle, seoDescription, summary, tweet, longDescription} fields only
  
     - seoTitle: a seo optimized meta title of the category page
     - seoDescription: a seo meta description of the category page
     - summary: a summary of the category page
     - tweet: a summary tweet with only one hashtag max. Use appropriate emojis.
     - longDescription: A long detailed description of more than 200 words about ${categoryTitle}. Do not repeat the title. No special characters allowed. Escape new lines. Mark new lines as \n

     Escape all output strings.
     valid JSON format only, no trailing commas
     The category page has tutorials and articles such as ${articleTitleString}
     `

    const completion = await generateText2Text(prompt, 7000, 0.3)

    const generatedContent = decodeURIComponent(
      completion.data.choices[0].message.content,
    )

    const jsonData = JSON.parse(generatedContent)
    console.log(jsonData)
    // safely return all fields
    const slug = categoryTitle.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')

    return {
      seoTitle: jsonData?.seoTitle ?? '',
      seoDescription: jsonData?.seoDescription ?? '',
      summary: jsonData?.summary ?? '',
      tweet: jsonData?.tweet ?? '',
      slug: slug,
      longDescription: jsonData?.longDescription ?? '',
      aiPrompt: prompt,
    }
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

export const generateArticleCategory = async (title, topic, articleTitles) => {
  const titlesString = articleTitles.slice(0, 7).join('\n- ')
  try {
    const {
      seoTitle,
      seoDescription,
      summary,
      tweet,
      slug,
      longDescription,
      aiPrompt,
    } = await generateCategoryMetadata(topic, title, titlesString)

    return {
      seoTitle,
      seoDescription,
      summary,
      tweet,
      slug,
      longDescription,
      aiPrompt,
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
