'use client'
import { MySQLIc, PostgreSQLIc, SQLiteIc } from '@/components/icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSchemaStore } from '@/store'
import { DatabaseFormat } from '@/types/database'

const schemas = [
  {
    id: 'postgresql',
    title: 'PostgreSQL',
    Icon: <PostgreSQLIc className='!size-8' />,
    description: 'Advanced open-source relational database with strong SQL compliance.'
  },
  {
    id: 'mysql',
    title: 'MySQL',
    Icon: <MySQLIc className='!size-8' />,
    description: 'Popular open-source relational database management system.'
  },
  {
    id: 'sqlite',
    title: 'SQLite',
    Icon: <SQLiteIc className='!size-8' />,
    description: 'Popular open-source relational database management system.'
  }
]

export function DatabasePicker() {
  const databaseFormat = useSchemaStore((state) => state.databaseFormat)
  const setDatabaseFormat = useSchemaStore((state) => state.setDatabaseFormat)

  return (
    <Card className='shadow-sm bg-neutral-900 rounded-md'>
      <CardHeader>
        <CardTitle>Choose Database Schema</CardTitle>
        <CardDescription hidden>Choose a database provider to deploy your schema.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-6 gap-2'>
          {schemas.map((option) => (
            <div
              key={option.id}
              className={`border rounded-md p-2 cursor-pointer transition-all hover:shadow-md ${
                databaseFormat === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-600 hover:border-gray-400'
              }`}
              onClick={() => setDatabaseFormat(option.id as DatabaseFormat)}
            >
              <div className='flex flex-col items-center text-center gap-2'>
                {option.Icon}
                <h4 className='font-medium text-sm'>{option.title}</h4>
                <p className='text-xs text-muted-foreground line-clamp-2'>{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
