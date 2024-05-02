'use client'

import { ExternalLink } from 'lucide-react'

type DeployResultProps = {
  supabaseLinkTables: string
}

export function DeployResult({ supabaseLinkTables }: DeployResultProps) {
  return (
    <div className='size-full flex flex-col gap-2 w-full animate-fade-slide'>
      <p className='text-muted-foreground text-sm'>View the results on the following link:</p>
      <div className='flex items-center gap-3'>
        <div
          className='justify-center text-sm font-medium transition-colors h-8 flex text-zinc-600 dark:text-green-200 bg-white 
          dark:bg-neutral-800 w-full px-3 py-1.5 rounded-md border border-zinc-700'
        >
          <div className='flex items-center flex-1 relative'>
            <span className='text-xs sm:text-sm'>{supabaseLinkTables}</span>
            <a
              href={supabaseLinkTables}
              target='_blank'
              rel='noreferrer'
              className='absolute right-0'
            >
              <ExternalLink className='size-4' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
