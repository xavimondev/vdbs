import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { PROMPT } from '@/prompt'

export const runtime = 'edge'

export async function POST(req: Request) {
  let customApiKey = cookies().get('api-key')?.value

  if (process.env.NODE_ENV === 'production' && !customApiKey) {
    return NextResponse.json(
      {
        data: undefined,
        message: 'Missing API KEY – make sure to set it.'
      },
      { status: 400 }
    )
  }

  if (
    process.env.NODE_ENV === 'development' &&
    (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '')
  ) {
    return NextResponse.json(
      {
        data: undefined,
        message: 'Missing OPENAI_API_KEY – make sure to add it to your .env file.'
      },
      { status: 400 }
    )
  }

  if (process.env.NODE_ENV === 'development') {
    customApiKey = process.env.OPENAI_API_KEY
  }

  const openai = createOpenAI({
    apiKey: customApiKey,
    compatibility: 'strict'
  })

  const { prompt: base64 } = await req.json()

  try {
    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: PROMPT
            },
            {
              type: 'image',
              image: base64
            }
          ]
        }
      ],
      maxTokens: 4096,
      temperature: 0.2
    })

    return result.toAIStreamResponse()
  } catch (error) {
    // console.log(Object.keys(error))
    // @ts-ignore
    const statusCode = error?.lastError?.statusCode ?? error.statusCode
    let errorMessage = 'An error has ocurred with API Completions. Please try again.'

    if (statusCode === 401) {
      errorMessage = 'The provided API Key is invalid. Please enter a valid API Key.'
    } else if (statusCode === 429) {
      errorMessage = 'You exceeded your current quota, please check your plan and billing details.'
    }

    return NextResponse.json(
      {
        message: errorMessage
      },
      { status: statusCode }
    )
  }
}
