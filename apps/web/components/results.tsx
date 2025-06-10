import { OptionsResults } from '@/components/options-results'
import { SchemaResults } from '@/components/schema-results'

export function Results() {
  return (
    <div className='flex flex-col size-full'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 size-full'>
        <SchemaResults />
        <OptionsResults />
      </div>
    </div>
  )
}
