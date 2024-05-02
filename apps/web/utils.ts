import { customAlphabet } from 'nanoid'
import confetti from 'canvas-confetti'

type SupportedImageTypes = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

export const isSupportedImageType = (type: string): type is SupportedImageTypes => {
  return ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(type)
}

export const toBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result !== 'string') return
      resolve(reader.result)
    }
    reader.onerror = (error) => reject(error)
  })
}

export const copyToClipboard = async (content: string) => {
  if (navigator.clipboard) navigator.clipboard.writeText(content)
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
)

const count = 200
const defaults = {
  origin: { y: 0.7 }
}

const fire = (particleRatio: number, opts: any) => {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  })
}

export const triggerConfetti = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55
  })
  fire(0.2, {
    spread: 60
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45
  })
}

export const getReferenceId = (connectionString: string) => {
  const chunks = connectionString.split('.')
  if (chunks.length >= 2) {
    const referenceId = chunks[1]?.split(':')[0]
    return referenceId
  }
  return
}
