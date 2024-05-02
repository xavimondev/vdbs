'use client'
import { Check, Clipboard } from 'lucide-react'
import { copyToClipboard } from '@/utils'
import { useSchemaStore } from '@/store'
import { useClipboard } from '@/hooks/use-clipboard'
import { CodeCommand } from '@/components/code-command'

export function RunCommand() {
  const { isCopied, setIsCopied } = useClipboard()
  const schema = useSchemaStore((state) => state.schema)
  const { cmdCode } = schema ?? {}

  return (
    <div
      className='shrink-0 justify-center text-sm font-medium transition-colors h-8 flex items-center text-zinc-600 
      dark:text-zinc-50 shadow-none bg-white dark:bg-neutral-800 w-full px-3 py-1.5 rounded-md border border-zinc-700'
    >
      <div className='flex items-center flex-1 gap-2 font-mono text-xs sm:text-sm relative'>
        {cmdCode && cmdCode !== '' && (
          <>
            npx vdbs add <CodeCommand commandCode={cmdCode} />
          </>
        )}
        <button
          className='absolute right-0'
          onClick={async () => {
            if (cmdCode && cmdCode !== '') {
              setIsCopied(!isCopied)
              await copyToClipboard(`npx vdbs add ${cmdCode}`)
            }
          }}
        >
          {isCopied ? <Check className='size-4' /> : <Clipboard className='size-4' />}
        </button>
      </div>
    </div>
  )
}
