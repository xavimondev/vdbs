import Link from 'next/link'

export function AppLogo() {
  return (
    <Link className='flex items-center gap-2' href='/'>
      <img src='/logo.webp' alt='Snap2SQL logo' width={26} height={26} />
      <span className='hover:text-green-700 dark:hover:text-green-400 transition-colors duration-300 font-medium'>
        Snap2SQL
      </span>
    </Link>
  )
}
