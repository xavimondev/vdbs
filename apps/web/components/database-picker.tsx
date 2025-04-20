'use client'
import { MySQLIc, PostgreSQLIc } from '@/components/icons'
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
  }
]

type DatabaseItemProps = {
  title: string
  Icon: any
  isSelected: boolean
  handleSelectItem: (itemSelected: string) => void
}

// function DatabaseItem({ title, Icon, isSelected, handleSelectItem }: DatabaseItemProps) {
//   return (
//     <div
//       className={cn(
//         'flex flex-col items-center gap-2 border hover:bg-gray-100 p-3 rounded-md transition-colors duration-200 cursor-pointer',
//         isSelected ? 'border-neutral-500' : 'border-neutral-300'
//       )}
//       onClick={() => handleSelectItem(title)}
//     >
//       <Icon className='size-10' />
//       <span>{title}</span>
//     </div>
//   )
// }

export function DatabasePicker() {
  // const [itemSelected, setItemSelected] = useState<string | null>(null)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className='ml-auto'>
          Select Database Schema <ChevronDownIcon className='text-muted-foreground' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0' align='end'>
        <Command>
          <CommandInput placeholder='Search database schema...' />
          <CommandList>
            <CommandEmpty>No roles found.</CommandEmpty>
            <CommandGroup>
              {schemas.map(({ id, title, description, Icon }) => (
                <CommandItem key={id} className='flex items-center gap-2.5 px-3 py-2'>
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
