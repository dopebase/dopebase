/*
 ** Blog seeder - Generates hundreds of articles based on a topic, using OpenAI's GPT
 */
import { generateText2Text } from '../../../../../system/ml'

const generateSections = async (topic, articleTitle) => {
  try {
    const prompt = `list maximum 10 sections for a detailed tutorial titled "${articleTitle}" on a blog about ${topic}?
     Return response in valid JSON format with a titles field only`
    const generatedContent = await generateText2Text(prompt, 7000, 0.2)
    console.log('Sections:')
    // console.log(generatedContent)
    const sections = JSON.parse(generatedContent).titles
    return sections
    // const generatedArticleIdeas = JSON.parse(generatedContent)
    // console.log(generatedArticleIdeas)
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
Sections + subsections

Prompt examples:
write a few paragraphs for a subsection named "Database Profiling"  within a section named "Error Handling and Debugging" for an article titled "Mastering Real-Time Database with Firebase: A Comprehensive Guide"
Include code example if applicable. For each code snippet, explain it step by step

write a few paragraphs for a subsection named "Creating a Deployment"  under a section named "Deploying Applications with Kubernetes" for an article titled "Mastering Kubernetes: A Comprehensive Tutorial for Beginners"
Include code example if applicable. For each code snippet, explain it step by step
format it in markdown
content only

*/

const generateIntroduction = async (topic, title, sections) => {
  try {
    const prompt = `In a few paragraphs, summarize an article titled "${title}". General topic is ${topic}."

    Sections and subsections info:
    ${JSON.stringify(sections)}

    optimize it for SEO
    return content only
    no headings
    do not repeat the article title
    do not repeat the section title
    format it in markdown
     `
    const generatedContent = await generateText2Text(prompt, 7000, 0.2)
    // console.log(prompt)
    // console.log(generatedContent)
    return generatedContent
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

const generateSectionIntro = async (topic, title, section, subsections) => {
  try {
    const prompt = `Describe a summary of a section named "${section}" for a tutorial titled "${title}". General topic is ${topic}."
    Section contains the following subsections: ${subsections.join(', ')}
    optimize it for SEO
    content only
    no headings
    do not repeat the tutorial title
    do not repeat the section title
    format it in markdown
     `
    const generatedContent = await generateText2Text(prompt, 7000, 0.2)
    // console.log(prompt)
    // console.log(generatedContent)
    return generatedContent
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

const generateSubsection = async (topic, title, section, subsection) => {
  try {
    const prompt = `write a few paragraphs for a subsection named "${subsection}" under a section named "${section}" for a tutorial titled "${title}". General topic is ${topic}."
    Include code examples if applicable. Explain each section step by step
    optimize it for SEO
    content only
    no headings
    do not repeat the tutorial title
    do not repeat the section title
    format it in markdown
     `
    const generatedContent = await generateText2Text(prompt, 7000, 0.2)
    // console.log(prompt)
    // console.log(generatedContent)
    return generatedContent
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

const generateConclusion = async (topic, title, sections) => {
  try {
    const prompt = `write a few paragraphs to conclude a tutorial titled "${title}". General topic is ${topic}"
      Sections and subsections info:
      ${JSON.stringify(sections)}

    optimize for SEO
    content only
    no headings
    format it in markdown
     `
    const generatedContent = await generateText2Text(prompt, 7000, 0.3)
    console.log(prompt)
    console.log(generatedContent)
    return generatedContent
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

const generateArticleContent = async (topic, title, sections, slug) => {
  try {
    const keyword = slug.replace(/-/g, ' ')
    const coverIndex = 1 + Math.floor(Math.random() * 21)
    const coverURL = `https://dopebase.com/media/cover${coverIndex}.jpg`

    var prompt = `Write a complete detailed SEO optimized tutorial titled "${title}" for a blog about ${topic}.
      Do not repeat the title.
      Start with a paragraph summarizing the article.
      Explain each section in details, step by step.
      Include the following sections and subsections:
    `

    var hasConclusion = false
    for (var i = 0; i < sections.length; i++) {
      const { title, subsections } = sections[i]
      if (title) {
        if (title === 'Conclusion') {
          hasConclusion = true
        }
        prompt += `- ${title}
        `
        if (subsections.length > 0) {
          for (var j = 0; j < subsections.length; j++) {
            prompt += `-- ${subsections[j]}
          `
          }
        }
      } else {
        prompt += `- ${sections[i]}
        `
      }
    }
    if (!hasConclusion) {
      prompt += `- Conclusion`
    }
    prompt += `
    Each subsection contains multiple paragraphs.
    Conclusion section should have multiple paragraphs.
    Format it in markdown
 `

    const generatedContent = await generateText2Text(prompt, 15000, 0.7)
    const nonTrimmedContent = generatedContent.replace(`# ${title}`, '')

    const nonPhotocontent = nonTrimmedContent.replace(/^\s+|\s+$/g, '')
    const content = nonPhotocontent.replace(
      `##`,
      `![${keyword}](${coverURL})\n##`,
    )

    // console.log(content)
    return { content, coverURL, aiPrompt: prompt }
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

const generateArticleContent2 = async (topic, articleTitle, sections, slug) => {
  const keyword = slug.replace(/-/g, ' ')
  const coverIndex = 1 + Math.floor(Math.random() * 21)
  const coverURL = `https://dopebase.com/media/cover${coverIndex}.jpg`

  // Introduction
  var content = await generateIntroduction(topic, articleTitle, sections)
  content = content.replace(`# ${articleTitle}`, '')

  // Cover photo
  content += `
    \n![${keyword}](${coverURL})\n
    `

  // Sections & subsections
  for (var i = 0; i < sections.length; i++) {
    const section = sections[i]
    const { title, subsections } = section

    content += `\n## ${title}\n`
    content += await generateSectionIntro(
      topic,
      articleTitle,
      title,
      subsections,
    )

    if (subsections?.length > 0) {
      for (var j = 0; j < subsections.length; j++) {
        content += `\n### ${subsections[j]}\n`
        content += await generateSubsection(
          topic,
          articleTitle,
          title,
          subsections[j],
        )
      }
    }
  }

  // Conclusion
  content += `\n## Conclusion\n`
  content += await generateConclusion(topic, articleTitle, sections)
  console.log(content)
  return { content, coverURL, aiPrompt: 'section based prompts' }

  //     var prompt = `Write a detailed SEO optimized tutorial titled "${title}" for a blog about ${topic} dedicated to software developers.
  //      Include code examples for each section with full documentation. Explain each code snippet step by step.
  //      Start with an introduction paragraph. Include the following sections and subsections:
  //      `
  //     for (var i = 0; i < sections.length; i++) {
  //       const { title, subsections } = sections[i]
  //       if (title && subsections.length > 0) {
  //         prompt += `- ${title}
  //         `
  //         for (var j = 0; j < subsections.length; j++) {
  //           prompt += `-- ${subsections[j]}
  //           `
  //         }
  //       } else {
  //         prompt += `- ${sections[i]}
  //         `
  //       }
  //     }
  //     prompt += `
  //     Each subsection contains a few paragraphs.
  //     Conclude with a summary paragraph.
  //     Format it in markdown
  //  `

  //     const generatedContent = await generateText2Text(prompt, 7000, 0.7)

  //     const nonTrimmedContent = generatedContent.replace(`# ${title}`, '')
  //     const nonPhotocontent = nonTrimmedContent.replace(/^\s+|\s+$/g, '')
  //     const content = nonPhotocontent.replace(
  //       `##`,
  //       `![${keyword}](${coverURL})\n##`,
  //     )
  //     return { content, coverURL, aiPrompt: prompt }
  //   } catch (error) {
  //     // Consider adjusting the error handling logic for your use case
  //     if (error.response) {
  //       console.error(error.response.status, error.response.data)
  //     } else {
  //       console.error(`Error with OpenAI API request: ${error.message}`)
  //     }
  //   }
}

const generateTags = async (topic, title, sections) => {
  try {
    const prompt = `What would be the tags for a blogpost titled "${title}" on a blog about ${topic}
     Return response in valid JSON format with a tags field only
     The article has the following sections:
     - ${sections.join('\n- ')}
     `

    const generatedContent = await generateText2Text(prompt, 7000, 0.3)

    const tags = JSON.parse(generatedContent).tags
    console.log(tags)
    return tags
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

const generateArticleMetadata = async (topic, title) => {
  try {
    const prompt = `Generate sections, tags, seoDescription, summary, tweet, slug for a blogpost titled "${title}" on a blog about ${topic}.
     Return response in valid JSON format with a {sections, tags, seoDescription, summary, tweet, slug} fields only
     - sections: at least 7 sections with multiple subsections for the article. format json [{title, subsections}]. No conclusion section
     - tags: list of tags for the blogpost
     - seoDescription: a seo meta description of the article. max 160 characters
     - summary: a summary of the article, including keywords from tags
     - tweet: A summary tweet with only one hashtag max. Use appropriate emojis.
     - slug: a slug for the article. 5 keywords max. Remove numbers and stop words. Remove duplicate words. Replace spaces with dashes. Remove words such as 'with, for, in, the, a, an, to, from, by, of, on, at, as, and, but, or, so, nor, yet, after, before, when, while, if, unless, until, although, because, since, whether, where, wherever, that, what, which, who' from the slug.
     `

    const generatedContent = await generateText2Text(prompt, 7000, 0.3)

    const jsonData = JSON.parse(generatedContent)
    return jsonData
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
}

export const generateIdeaStructure = async (title, topic) => {
  const { sections, tags, seoDescription, summary, tweet, slug } =
    await generateArticleMetadata(topic, title)

  return {
    title,
    sections,
    tags,
    seoDescription,
    summary,
    tweet,
    slug,
  }
}

export const generateArticle = async (title, topic, sections, slug) => {
  const { content, coverURL, aiPrompt } = await generateArticleContent(
    topic,
    title,
    sections,
    slug,
  )

  return {
    content,
    coverURL,
    aiPrompt,
  }
}
