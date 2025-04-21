import { AppLogo } from '@/components/app-logo'
import { DatabasePicker } from '@/components/database-picker'

export async function Header() {
  return (
    <header>
      <div className='flex flex-col sm:flex-row pb-4 sm:items-center gap-2 sm:gap-0 w-full'>
        <div className='hidden sm:flex items-center cursor-pointer text-green-500 dark:text-green-200'>
          <AppLogo />
        </div>
        <div className='flex gap-2 w-full justify-end'>
          <DatabasePicker />
        </div>
      </div>
    </header>
  )
}
