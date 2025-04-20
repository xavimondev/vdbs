import { AppLogo } from '@/components/app-logo'
import { DatabasePicker } from '@/components/database-picker'

export async function Header() {
  // const apikey = cookies().get('api-key')?.value

  return (
    <header>
      <div className='flex flex-col sm:flex-row pb-4 sm:items-center gap-2 sm:gap-0 w-full'>
        <div className='hidden sm:flex items-center cursor-pointer text-green-500 dark:text-green-200'>
          <AppLogo />
        </div>
        <div className='flex gap-2 w-full justify-end'>
          <DatabasePicker />
          {/* {!apikey ? <MissingAlert /> : <SuccessAlert />} */}
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button className='w-48 rounded-md p-[1px] focus:outline-none hidden sm:flex gap-2 items-center bg-card border hover:bg-zinc-400 dark:hover:bg-zinc-800 transition-colors duration-300'>
                <KeyRound size={18} className='text-green-300' />
                <span className='text-transparent bg-clip-text bg-gradient-to-tr from-green-700 to-green-300 dark:from-green-500 dark:to-green-100 font-semibold'>
                  Set Your API Key
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[400px]' align='end'>
              <div className='flex flex-col gap-5'>
                <FormApiKey />
              </div>
            </PopoverContent>
          </Popover> */}
        </div>
      </div>
    </header>
  )
}
