'use client'

import { useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import { Check, KeyRound } from 'lucide-react'
import { getApiKey, setApiKey } from '@/actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const initialState = {
  msg: ''
}

export function FormApiKey() {
  const [state, formAction] = useFormState(setApiKey, initialState)
  const inputRef = useRef<HTMLInputElement | null>(null)
  // TODO: Find a better way to do this, it shifts the input's value when component mounts
  useEffect(() => {
    const getCookie = async () => {
      const cookie = await getApiKey()
      inputRef.current!.value = cookie ?? ''
    }
    getCookie()
  }, [])

  return (
    <div className='flex flex-col gap-2'>
      <form
        className='flex flex-col gap-2 w-full'
        action={(formData) => {
          const apiKey = formData.get('key') as string
          if (apiKey.trim().length === 0) return
          formAction(formData)
        }}
      >
        <div className='flex flex-col gap-2.5 text-center sm:text-left'>
          <h2 className='text-lg font-semibold leading-none tracking-tight'>API Key</h2>
          <p className='text-sm text-muted-foreground'>
            Set your OpenAI API key. You can grab it{' '}
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='text-cyan-500 underline underline-offset-4 hover:text-cyan-300'
              href='https://platform.openai.com/account/api-keys'
            >
              here
            </a>
            .
          </p>
        </div>
        <div className='flex'>
          <Label
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only text-right'
            htmlFor='key'
          ></Label>
        </div>
        <div className='relative'>
          <KeyRound className='absolute left-3 top-2.5 size-4 text-muted-foreground' />
          <Input
            placeholder='XX-XXXXXXXXXXXXXXXX'
            id='key'
            name='key'
            className='pl-9'
            required
            ref={inputRef}
          />
        </div>
        <Button type='submit' className='w-full'>
          Submit
        </Button>
      </form>
      {state.msg !== '' && (
        <div className='flex items-center gap-1 mt-1 text-green-600 dark:text-green-400'>
          <Check className='size-4' />
          <p className='text-sm font-medium'>{state.msg}</p>
        </div>
      )}
    </div>
  )
}
