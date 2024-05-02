import { SVGProps } from 'react'

function GitIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
      <path d='M9 18c-4.51 2-5-2-7-2' />
    </svg>
  )
}

function TwitterIc(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='lucide lucide-twitter'
      {...props}
    >
      <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className='pt-4 flex flex-row justify-between text-center dark:text-green-200 text-green-500'>
      <a
        href='https://twitter.com/xavimonp'
        aria-label='My twitter account'
        target='_blank'
        className='flex items-center gap-2'
      >
        <TwitterIc className='size-5 ' />
        xavimondev
      </a>
      <p>Supabase Open Source Hackathon</p>
      <p>
        <a
          href='https://github.com/xavimondev/vdbs'
          aria-label='View app repository on GitHub'
          rel='noreferrer'
          target='_blank'
          className='flex items-center gap-2'
        >
          <GitIc className='size-5 ' />
          source
        </a>
      </p>
    </footer>
  )
}
