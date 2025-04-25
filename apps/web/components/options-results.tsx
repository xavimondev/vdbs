'use client'
import { Card } from '@/components/ui/card'
import { useSchemaStore } from '@/store'
import { DatabaseDeployments } from '@/components/database-deployments'

export function OptionsResults() {
  const schema = useSchemaStore((store) => store.schema)
  const { tables } = schema ?? {}

  return (
    <div className='flex flex-col gap-4'>
      <Card className='border shadow-sm p-5'>
        <h2 className='text-base font-medium mb-4'>Database Schema Information</h2>
        <div className='space-y-2 h-[247px] overflow-scroll'>
          {tables && (
            <div className='flex flex-col gap-4'>
              <h3 className='text-sm font-medium uppercase text-muted-foreground'>
                Detected Tables({tables.length})
              </h3>
              <ul className='text-xs space-y-2'>
                {tables.map(({ name, numberOfColumns }) => (
                  <li key={name} className='flex justify-between'>
                    <span className='text-muted-foreground'>{name}</span>
                    <span>{numberOfColumns} columns</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
      <DatabaseDeployments onConnect={() => console.log('')} />
    </div>
  )
}
