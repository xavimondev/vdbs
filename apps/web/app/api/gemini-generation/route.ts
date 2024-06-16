import { NextResponse } from 'next/server'
import { StreamingTextResponse, streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { PROMPT } from '@/prompt'

export const runtime = 'edge'

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

  const { prompt: base64 } = await req.json()

  try {
    const result = await streamText({
      model: google('models/gemini-1.5-flash-latest'),
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
      maxTokens: 1024,
      temperature: 0.2
    })

    return new StreamingTextResponse(result.toAIStream())
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
