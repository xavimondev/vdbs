import { NextResponse } from 'next/server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { PG_PROMPT } from '@/prompt'

export const runtime = 'edge'

export async function POST(req: Request) {
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

  const { prompt: base64 } = await req.json()

  try {
    const result = streamText({
      model: openai('gpt-4.1-mini'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: PG_PROMPT
            },
            {
              type: 'image',
              image: base64
            }
          ]
        }
      ],
      // maxTokens: 4096,
      temperature: 0.2
    })

    return result.toDataStreamResponse()
  } catch (error) {
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
