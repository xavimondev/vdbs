'use server'

import { Redis } from '@upstash/redis'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const saveGeneration = async (data: { sqlSchema: string; cmdCode: string }) => {
  const { cmdCode, sqlSchema } = data
  const redis = Redis.fromEnv()
  const res = await redis.set(cmdCode, sqlSchema)
  return res
}

export const setApiKey = (prevState: any, formData: FormData) => {
  const apiKey = formData.get('key') as string
  cookies().set('api-key', apiKey, {
    secure: true
  })
  revalidatePath('/')
  return { msg: 'Key Saved Successfully' }
}

export const getApiKey = async () => {
  return cookies().get('api-key')?.value
}
