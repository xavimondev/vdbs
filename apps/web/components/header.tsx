import { UploadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppLogo } from '@/components/app-logo'

type HeaderProps = {
  resetSchema: () => void
}

export function Header({ resetSchema }: HeaderProps) {
  return (
    <header>
      <div className='flex flex-col sm:flex-row pb-4 sm:items-center gap-2 sm:gap-0 w-full'>
        <div className='hidden sm:flex items-center cursor-pointer text-green-500 dark:text-green-200'>
          <AppLogo />
        </div>
        <div className='flex gap-2 w-full justify-end'>
          <Button variant='outline' size='sm' onClick={resetSchema}>
            <UploadIcon className='mr-2 size-4' />
            Upload Another Diagram
          </Button>
        </div>
      </div>
    </header>
  )
}
