export const APP_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://vdbs.vercel.app/'

export const TOTAL_GENERATIONS = 1
// 1 hour
export const TTL_SECONDS = 60 * 60
