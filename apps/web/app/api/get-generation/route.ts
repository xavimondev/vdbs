import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

const redis = Redis.fromEnv()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const codeGeneration = searchParams.get('code')
  if (!codeGeneration) {
    return NextResponse.json(
      { error: 'Code generation was not provided.' },
      {
        status: 400
      }
    )
  }

  try {
    const code = await redis.get(codeGeneration)

    return NextResponse.json({ data: code })
  } catch (error) {
    return NextResponse.json(
      { error: 'An error has ocurred while fetching sql code.' },
      {
        status: 500
      }
    )
  }
}
