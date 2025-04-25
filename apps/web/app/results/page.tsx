import { UploadIcon } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { OptionsResults } from '@/components/options-results'
import { SchemaResults } from '@/components/schema-results'
import { Button } from '@/components/ui/button'

export default function Results() {
  return (
    <div className='flex flex-col'>
      <Header>
        <Button asChild variant='outline' size='sm'>
          <Link href='/'>
            <UploadIcon className='mr-2 size-4' />
            Upload Another Diagram
          </Link>
        </Button>
      </Header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <SchemaResults />
        <OptionsResults />
      </div>
    </div>
  )
}
