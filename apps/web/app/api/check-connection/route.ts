import { NextResponse } from 'next/server'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

type ResponseJson = {
  url: string
}

export async function POST(req: Request) {
  const { url } = (await req.json()) as ResponseJson

  if (url === '') {
    return NextResponse.json(
      {
        error:
          "We couldn't find a connection URL. Please try again with the correct connection URL."
      },
      { status: 400 }
    )
  }
  // Disable prefetch as it is not supported for "Transaction" pool mode
  const client = postgres(url, { prepare: false })
  const db = drizzle(client)

  // Check if connection is successful
  try {
    await db.execute(sql`SELECT NOW()`)
  } catch (error) {
    // @ts-ignore
    let message = error.code
    if (message === 'SASL_SIGNATURE_MISMATCH') {
      message = 'Database password is missing.'
    } else if (message === 'ENOTFOUND') {
      message =
        'Your connection URL is invalid. Please double-check it and make the necessary corrections.'
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Connection stablished succesfully' })
}
