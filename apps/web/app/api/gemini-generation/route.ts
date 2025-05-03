import { NextResponse } from 'next/server'
import { generateObject } from 'ai'
import { google } from '@ai-sdk/google'
import { MYSQL_PROMPT, PG_PROMPT, SQLITE_PROMPT } from '@/prompt'
import { z } from 'zod'
import { uptash } from '@/utils/rate-limit'
import { headers } from 'next/headers'

const DB_SCHEMA = z.object({
  results: z.object({
    sqlSchema: z.string(),
    tables: z.array(
      z.object({
        name: z.string(),
        numberOfColumns: z.number()
      })
    )
  })
})

const prompts: Record<string, string> = {
  mysql: MYSQL_PROMPT,
  postgresql: PG_PROMPT,
  sqlite: SQLITE_PROMPT
}

const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? uptash : false

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'development' && !process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json(
      {
        data: undefined,
        message: 'Missing GOOGLE_GENERATIVE_AI_API_KEY – make sure to add it to your .env file.'
      },
      { status: 400 }
    )
  }

  if (process.env.NODE_ENV === 'development') {
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
      model: google('gemini-2.0-flash-001'),
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
    let errorMessage = 'An error has ocurred with API Completions. Please try again.'
    // @ts-ignore
    if (error.status === 401) {
      errorMessage = 'The provided API Key is invalid. Please enter a valid API Key.'
    }
    // @ts-ignore
    const { name, status, headers } = error
    return NextResponse.json({ name, status, headers, message: errorMessage }, { status })
  }
}
