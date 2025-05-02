'use client'
import { MySQLIc, PostgreSQLIc, SQLiteIc } from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { ChevronDownIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Dispatch, SetStateAction, useState } from 'react'

const schemas = [
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    Icon: <PostgreSQLIc className='!size-6' />,
    description: 'Advanced open-source relational database with strong SQL compliance.'
  },
  {
    id: 'mysql',
    title: 'MySQL',
    Icon: <MySQLIc className='!size-6' />,
    description: 'Popular open-source relational database management system.'
  },
  {
    id: 'sqlite',
    title: 'SQLite',
    Icon: <SQLiteIc className='!size-6' />,
    description: 'Popular open-source relational database management system.'
  }
]

type DatabasePickerProps = {
  databaseFormat: string | null
  setDatabaseFormat: Dispatch<SetStateAction<string | null>>
}

export function DatabasePicker({ databaseFormat, setDatabaseFormat }: DatabasePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='ml-auto'>
          {!databaseFormat ? 'Select Database Schema' : databaseFormat}{' '}
          <ChevronDownIcon className='text-muted-foreground' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='end'>
        <Command>
          <CommandInput placeholder='Search database schema...' />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              {schemas.map(({ id, title, description, Icon }) => (
                <CommandItem
                  key={id}
                  className='flex items-center gap-2.5 px-3 py-2'
                  value={id}
                  onSelect={(value) => {
                    setDatabaseFormat(value)
                    setOpen(false)
                  }}
                >
                  {Icon}
                  <div className='flex flex-col items-start'>
                    <p>{title}</p>
                    <p className='text-xs text-muted-foreground'>{description}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
