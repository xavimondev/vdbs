'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, TableRowsSplit } from 'lucide-react'
import { toast } from 'sonner'
import { useCompletion } from 'ai/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { isSupportedImageType, nanoid, toBase64 } from '@/utils'
import { useSchemaStore } from '@/store'
import { saveGeneration } from '@/actions'
import { Results } from '@/components/results'

const LIMIT_MB = 1.5 * 1024 * 1024

export default function Page(): JSX.Element {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [blobURL, setBlobURL] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const setSchema = useSchemaStore((state) => state.setSchema)
  const setSupabaseLinkTables = useSchemaStore((state) => state.setSupabaseLinkTables)
  const { complete, completion, isLoading } = useCompletion({
    api: 'api/code-generation',
    onFinish: (_, completion) => {
      if (!completion) {
        return
      }

      if (
        completion.trim() === 'Invalid SQL diagram.' ||
        !completion.includes('CREATE TABLE') ||
        !completion.includes('--TABLE')
      ) {
        toast.error('This is not a valid SQL diagram. Please try again.')
        return
      }

      const sqlSchema = completion
        .split('--TABLE\n')
        .filter((table: string) => table !== '')
        .join('\n')
        .trim()

      const data = {
        sqlSchema,
        cmdCode: nanoid()
      }

      // Saving in db the generation
      toast.promise(saveGeneration(data), {
        loading: 'Saving Generation...',
        success: () => {
          setFinished(true)
          setSchema(data)
          setSupabaseLinkTables(undefined)
          return `Generation saved successfully.`
        },
        error: 'An error has ocurred while saving data.'
      })
    },
    onError: (err) => {
      const result = JSON.parse(err.message)
      toast.error(result.message)

      setBlobURL(null)
      setFinished(true)
    }
  })

  const submit = async (file?: File | Blob) => {
    if (!file) return

    if (!isSupportedImageType(file.type)) {
      return toast.error('Unsupported format. Only JPEG, PNG, GIF, and WEBP files are supported.')
    }

    if (file.size > LIMIT_MB) return toast.error('Image too large, maximum file size is 1MB.')

    const base64 = await toBase64(file)

    // if (base64.length > 2_333_333) {
    //   return toast.error("Image too large, maximum file size is 1MB.");
    // }

    setBlobURL(URL.createObjectURL(file))
    setFinished(false)
    complete(base64)
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  const handleDragOver = (e: DragEvent) => {
    setIsDraggingOver(true)
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingOver(false)

    const file = e.dataTransfer?.files?.[0]
    submit(file)
  }

  const handlePaste = (e: ClipboardEvent) => {
    const file = e.clipboardData?.files?.[0]
    submit(file)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    submit(file)
  }

  useEffect(() => {
    addEventListener('paste', handlePaste)
    addEventListener('drop', handleDrop)
    addEventListener('dragover', handleDragOver)
    addEventListener('dragleave', handleDragLeave)

    return () => {
      removeEventListener('paste', handlePaste)
      removeEventListener('drop', handleDrop)
      removeEventListener('dragover', handleDragOver)
      removeEventListener('dragleave', handleDragLeave)
    }
  }, [])

  return (
    <>
      <div
        className={cn(
          'rounded-md border-2 border-dashed text-gray-700 dark:text-gray-300 cursor-pointer transition-colors ease-in-out bg-zinc-100 dark:bg-zinc-900 relative group select-none grow pointer-events-none [@media(hover:hover)]:pointer-events-auto',
          {
            'border-gray-500 hover:border-black dark:border-gray-600 dark:hover:border-gray-400':
              !isDraggingOver,
            'border-gray-300 dark:border-gray-700': isDraggingOver
          }
        )}
        onClick={() => inputRef.current?.click()}
      >
        {blobURL && (
          <Image
            src={blobURL}
            unoptimized
            fill
            className='lg:object-contain object-cover min-h-16'
            alt='Uploaded image'
          />
        )}

        <div
          className={cn(
            'rounded-md flex flex-col w-full h-full p-3 items-center justify-center text-center absolute bg-zinc-100/70 dark:bg-zinc-900/70 text-lg',
            {
              'opacity-0 group-hover:opacity-100 transition ease-in-out': completion
            }
          )}
        >
          {isLoading ? (
            <Loader2 className='animate-spin size-12' />
          ) : (
            <>
              <TableRowsSplit className='size-20 xl:size-28' />
              <p className='font-bold mb-1 sm:mb-4 text-xl sm:text-3xl 2xl:text-5xl mt-3'>
                DB Image to SQL Schema
              </p>
              <p className='hidden [@media(hover:hover)]:block'>
                Drop or paste anywhere, or click to upload.
              </p>
              <div className='w-56 space-y-4 [@media(hover:hover)]:hidden pointer-events-auto'>
                <button className='rounded-full w-full py-3 bg-black dark:bg-white text-white dark:text-black'>
                  Tap to upload
                </button>
                <input
                  type='text'
                  onKeyDown={(e) => e.preventDefault()}
                  placeholder='Hold to paste'
                  onClick={(e) => e.stopPropagation()}
                  className='text-center w-full rounded-full py-3 bg-gray-200 dark:bg-gray-800 placeholder-black dark:placeholder-white focus:bg-white dark:focus:bg-black focus:placeholder-gray-700 dark:focus:placeholder-gray-300 transition-colors ease-in-out focus:outline-none border-2 focus:border-green-300 dark:focus:border-green-700 border-transparent'
                />
              </div>
            </>
          )}
        </div>
        <input
          type='file'
          className='hidden'
          ref={inputRef}
          onChange={handleInputChange}
          accept='image/jpeg, image/png, image/gif, image/webp'
        />
      </div>
      {(isLoading || completion) && (
        <div className='space-y-3 lg:basis-1/2 rounded-md w-full drop-shadow-sm'>
          <Results code={completion} finished={finished} />
        </div>
      )}
    </>
  )
}
