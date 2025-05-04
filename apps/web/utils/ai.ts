import { MYSQL_PROMPT, PG_PROMPT, SQLITE_PROMPT } from '@/prompt'
import { z } from 'zod'

export const DB_SCHEMA = z.object({
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

export const prompts: Record<string, string> = {
  mysql: MYSQL_PROMPT,
  postgresql: PG_PROMPT,
  sqlite: SQLITE_PROMPT
}
