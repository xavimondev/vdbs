import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { sql } from 'drizzle-orm'

// type Provider = 'neon' | 'supabase' | 'turso'

export async function deploySchema(connectionString: string, sqlSchema: string) {
  try {
    // Disable prefetch as it is not supported for "Transaction" pool mode
    const client = postgres(connectionString, { prepare: false })
    const db = drizzle(client)
    await db.execute(sql`SELECT NOW()`)

    // Execute the migration
    await db.execute(sql.raw(sqlSchema))

    return { success: true }
  } catch (error) {
    // @ts-ignore
    let message = error.code
    if (message === 'SASL_SIGNATURE_MISMATCH') {
      message = 'Database password is missing.'
    } else if (message === 'ENOTFOUND') {
      message =
        'Your connection URL is invalid. Please double-check it and make the necessary corrections.'
    } else {
      message = 'Unknown error occurred'
    }

    return {
      success: false,
      message
      // error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// export async function testConnection(connectionString: string) {
//   try {
//     // Disable prefetch as it is not supported for "Transaction" pool mode
//     const client = postgres(connectionString, { prepare: false })
//     const db = drizzle(client)
//     await db.execute('SELECT NOW()')
//     // if (provider === 'supabase' || provider === 'neon') {
//     // } else {
//     //   throw new Error(`Unsupported provider: ${provider}`)
//     // }

//     return { success: true }
//   } catch (error) {
//     console.log(error)
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     }
//   }
// }
