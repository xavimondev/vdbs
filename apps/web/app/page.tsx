'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { UploadIcon } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { isSupportedImageType, toBase64 } from '@/utils'

import { useSchemaStore } from '@/store'

import { Header } from '@/components/header'
import { DatabasePicker } from '@/components/database-picker'
import { Results } from '@/components/results'

const LIMIT_MB = 2 * 1024 * 1024

export default function Page() {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [blobURL, setBlobURL] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const setSchema = useSchemaStore((state) => state.setSchema)
  const schema = useSchemaStore((state) => state.schema)
  const databaseFormat = useSchemaStore((state) => state.databaseFormat)
  const setDatabaseFormat = useSchemaStore((state) => state.setDatabaseFormat)

  const getGenerationAI = async (base64: string) => {
    const toastId = toast.loading('Generation Database Schema')

    try {
      setIsLoading(true)
      const response = await fetch('api/gemini-generation', {
        method: 'POST',
        body: JSON.stringify({ prompt: base64, databaseFormat }),
        headers: {
          'Content-type': 'application/json'
        }
      })

      if (response.status === 429) {
        throw new Error('You have reached your request limit for the day.')
      } else if (response.status !== 200) {
        throw new Error('An error has ocurred while generation database schema')
      }

      const results = await response.json()
      const { sqlSchema, tables } = results.data

      if (sqlSchema.trim() === 'Invalid SQL diagram.' || !sqlSchema.includes('CREATE TABLE')) {
        toast.error('This is not a valid SQL diagram. Please try again.')
        return
      }
      const schema = {
        sqlSchema,
        tables
      }
      setSchema(schema)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
      toast.dismiss(toastId)
    }
  }

  const submit = async (file?: File | Blob) => {
    if (!file) return

    if (!isSupportedImageType(file.type)) {
      return toast.error('Unsupported format. Only JPEG, PNG, and WEBP files are supported.')
    }

    if (file.size > LIMIT_MB) return toast.error('Image too large, maximum file size is 1MB.')

    const base64 = await toBase64(file)

    if (!databaseFormat) {
      toast.error(`You haven't selected a database format`)
      return
    }

    setBlobURL(URL.createObjectURL(file))
    await getGenerationAI(base64)
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

  const resetSchema = () => {
    setSchema(undefined)
    setBlobURL(null)
    setDatabaseFormat('postgresql')
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
    <div className='flex flex-col w-full space-y-4'>
      <Header resetSchema={resetSchema} />
      {!schema ? (
        <div className='flex flex-col space-y-5 size-full'>
          <DatabasePicker />
          <div
            className={cn(
              `rounded-md 
         border-2 
         border-dashed 
         text-gray-300 
         cursor-pointer 
         transition-colors 
         ease-in-out 
         bg-neutral-950 
         relative 
         group 
         select-none 
         grow`,
              {
                'border-gray-600 hover:border-gray-500': !isDraggingOver,
                'border-gray-700': isDraggingOver
              },
              {
                'pointer-events-none border-[2px] animate-blink': isLoading
              }
            )}
            onClick={() => inputRef.current?.click()}
          >
            {blobURL ? (
              <Image
                src={blobURL}
                unoptimized
                fill
                className='lg:object-contain object-cover'
                alt='Uploaded image'
              />
            ) : (
              <div
                className={cn(
                  'rounded-md flex flex-col w-full h-full p-3 items-center justify-center text-center absolute bg-neutral-900 text-lg'
                )}
              >
                <div className='rounded-full bg-primary/10 p-4'>
                  <UploadIcon className='size-10 text-primary' />
                </div>
                <p className='font-semibold mb-1 sm:mb-3 text-xl mt-3'>
                  Drop or paste anywhere, or click to upload
                </p>
                <p className='hidden [@media(hover:hover)]:block text-sm text-muted-foreground'>
                  Supports PNG, JPEG, and JPG (max 2MB)
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
              </div>
            )}
            <input
              type='file'
              className='hidden'
              ref={inputRef}
              onChange={handleInputChange}
              accept='image/jpeg, image/png, image/webp'
            />
          </div>
        </div>
      ) : (
        <Results />
      )}
    </div>
  )
}
