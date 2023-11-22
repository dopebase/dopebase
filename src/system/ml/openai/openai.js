import OpenAI from 'openai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
console.log('open ai client ' + OPENAI_API_KEY)
const openaiClient = new OpenAI({ apiKey: OPENAI_API_KEY })

export const callOpenAI = async (prompt, maxTokens, temperature) => {
  // console.log(`OpenAI sleeping for 1 second...`)
  // await new Promise(resolve => setTimeout(resolve, 1000 * 2))
  console.log(`OpenAI GPT3 call for: ${prompt}`)
  return await openaiClient.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: temperature,
    max_tokens: maxTokens,
  })
}

export const callOpenAIGPT4 = async (prompt, maxTokens, temperature) => {
  console.log(`OpenAI sleeping for 25 seconds...`)
  await new Promise(resolve => setTimeout(resolve, 1000 * 20))
  console.log(`OpenAI GPT4 call for: ${prompt}`)
  return await openaiClient.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: temperature,
    max_tokens: maxTokens,
  })
}

export const generateText2Text = async (
  prompt,
  maxTokens = 3800,
  temperature = 0.6,
) => {
  console.log(`Fetching OpenAI respone for ${JSON.stringify(prompt)} `)
  try {
    const completion = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: temperature,
      max_tokens: maxTokens,
    })
    console.log(JSON.stringify(completion))

    const response = `${completion.choices[0].message.content}`
    if (response?.length > 0) {
      return response.trim()
    }
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    console.log(error)
    if (error.response) {
      console.error(error.response.status, error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
    }
  }
  return ''
}
