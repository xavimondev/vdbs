import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// import { TOTAL_GENERATIONS } from "@/constants";
import { PROMPT } from '@/prompt'

const openai = new OpenAI()

export const runtime = 'edge'

// const ratelimit =
//   process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
//     ? new Ratelimit({
//         redis: new Redis({
//           url: process.env.UPSTASH_REDIS_REST_URL,
//           token: process.env.UPSTASH_REDIS_REST_TOKEN,
//         }),
//         limiter: Ratelimit.slidingWindow(TOTAL_GENERATIONS, "1440 m"), // 1 per day
//         analytics: true,
//       })
//     : false;

export async function POST(req: Request) {
  const customApiKey = cookies().get('api-key')?.value

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

  if (customApiKey) {
    // Set user's api key
    openai.apiKey = customApiKey as string
  }

  // const hasCustomApiKey = customApiKey && customApiKey.trim().length > 0;

  // if (ratelimit) {
  //   const ip = req.headers.get("x-real-ip") ?? "local";

  //   const { success, limit, reset, remaining } = await ratelimit.limit(ip);
  //   if (!success) {
  //     return NextResponse.json(
  //       { message: "You have reached your request limit for the day." },
  //       {
  //         status: 429,
  //         headers: {
  //           "X-RateLimit-Limit": limit.toString(),
  //           "X-RateLimit-Remaining": remaining.toString(),
  //           "X-RateLimit-Reset": reset.toString(),
  //         },
  //       }
  //     );
  //   }
  // }

  const { prompt: base64 } = await req.json()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      stream: true,
      max_tokens: 4096,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: PROMPT
            },
            {
              type: 'image_url',
              image_url: {
                url: base64
              }
            }
          ]
        }
      ]
    })

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      let errorMessage = 'An error has ocurred with API Completions. Please try again.'
      if (error.code === 'invalid_api_key') {
        errorMessage = 'The provided API Key is invalid. Please enter a valid API Key.'
      }

      const { name, status, headers } = error
      return NextResponse.json({ name, status, headers, message: errorMessage }, { status })
    } else {
      throw error
    }
  }
}
