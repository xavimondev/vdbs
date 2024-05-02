import { useEffect, useState } from 'react'

export function useClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [isCopied])

  return {
    isCopied,
    setIsCopied
  }
}
