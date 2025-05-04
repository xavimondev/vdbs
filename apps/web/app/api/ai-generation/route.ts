import { NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { openai } from '@ai-sdk/openai'
import { uptash } from '@/utils/rate-limit'
import { headers } from 'next/headers'

import { DB_SCHEMA, prompts } from '@/utils/ai'

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? uptash : false

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

  if (process.env.NODE_ENV === 'production') {
    if (ratelimit) {
      const ip = (await headers()).get('x-forwarded-for') ?? 'local'

      const { success } = await ratelimit.limit(ip)
      if (!success) {
        return NextResponse.json(
          { message: 'You have reached your request limit for the day.' },
          { status: 429 }
        )
      }
    }
  }

  const { prompt: base64, databaseFormat } = await req.json()

  try {
    const result = await generateObject({
      model: openai('gpt-4.1-mini'),
      schema: DB_SCHEMA,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompts[databaseFormat] as string
            },
            {
              type: 'image',
              image: base64
            }
          ]
        }
      ],
      temperature: 0.2
    })

    return NextResponse.json({
      data: result.object.results
    })
  } catch (error) {
    // @ts-ignore
    const statusCode = error?.lastError?.statusCode ?? error.statusCode
    let errorMessage = 'An error has ocurred with API Completions. Please try again.'

    if (statusCode === 401) {
      errorMessage = 'The provided API Key is invalid. Please enter a valid API Key.'
    } /*else if (statusCode === 429) {
      errorMessage = 'You exceeded your current quota, please check your plan and billing details.'
    }*/

    return NextResponse.json(
      {
        message: errorMessage
      },
      { status: statusCode }
    )
  }
}
