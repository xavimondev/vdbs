import { NextResponse } from 'next/server'
import { deploySchema } from '@/utils/database'

type ResponseJson = {
  url: string
  sqlSchema: string
}

export async function POST(req: Request) {
  const { url, sqlSchema } = (await req.json()) as ResponseJson

  if (url === '' || !sqlSchema) {
    return NextResponse.json(
      {
        error:
          "We couldn't find a connection URL or a SQL Schema. Please try again with the correct information."
      },
      { status: 400 }
    )
  }

  const response = await deploySchema(url, sqlSchema)
  if (!response.success) {
    return NextResponse.json({ error: response.message }, { status: 500 })
  }

  return NextResponse.json({
    message: 'Database Schema deployed successfully'
  })
}
