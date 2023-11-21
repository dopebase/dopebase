import { generateText2Text } from '../../../../../system/ml'

const generateTagMetadata = async (topic, tagName, articleTitle) => {
  try {
    const prompt = `Generate seoTitle, seoDescription, summary, tweet, longDescription for an tag archive page named "${tagName}" on a blog.
     Return response in valid JSON format with a {seoTitle, seoDescription, summary, tweet, longDescription} fields only
  
     seoTitle: a seo optimized meta title of the tag
     seoDescription: a seo meta description of the tag
     summary: a summary of the tag
     tweet: a summary tweet with only one hashtag max. Use appropriate emojis.
     longDescription: A long detailed description of 200 words about ${tagName}. Escape all output strings
     
     Escape all output strings
     The webpage has tutorials and articles such as article titled ${articleTitle} (do not repeat or include article title)
     valid JSON format only, no trailing commas, escape all output strings
     `

    const completion = await generateText2Text(prompt, 7000, 0.3)

    const generatedContent = decodeURIComponent(
      completion.data.choices[0].message.content,
    )
    console.log(generatedContent)

    const jsonData = JSON.parse(generatedContent)

    // safely return all fields
    const slug = tagName.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-')
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

export const generateArticleTag = async (tagName, topic, articleTitle) => {
  const {
    seoTitle,
    seoDescription,
    summary,
    tweet,
    slug,
    longDescription,
    aiPrompt,
  } = await generateTagMetadata(topic, tagName, articleTitle)

  return {
    seoTitle,
    seoDescription,
    summary,
    tweet,
    slug,
    longDescription,
    aiPrompt,
  }
}
