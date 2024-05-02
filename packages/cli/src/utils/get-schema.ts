import fetch from 'node-fetch'

const ENDPOINT = `https://vdbs.vercel.app/api/get-generation?code=`

type DataResponse = { data?: string; error?: string }

export const getSchema = async (generationCode: string): Promise<DataResponse> => {
  try {
    const response = await fetch(`${ENDPOINT}${generationCode}`)
    const data = (await response.json()) as DataResponse
    return data
  } catch (error) {
    console.error(error)
    return {
      error: 'An error has ocurred.'
    }
  }
}
