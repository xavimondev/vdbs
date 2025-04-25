import React, { useState } from 'react'
import { AlertCircleIcon, ServerIcon, CloudIcon, ZapIcon, GlobeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'

const providers = [
  {
    id: 'planetscale',
    name: 'PlanetScale',
    icon: GlobeIcon,
    description: `The world's fastest relational database`,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-800'
  },
  {
    id: 'neon',
    name: 'Neon',
    icon: ZapIcon,
    description: 'Ship faster with Postgres',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: ServerIcon,
    description: 'Open source Firebase alternative',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  },
  {
    id: 'turso',
    name: 'Turso',
    icon: CloudIcon,
    description: 'SQLite Databases for all Apps',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800'
  }
]

type DatabaseConnectionProps = {
  onConnect: (connectionString: string, provider: string) => void
}

export function DatabaseDeployments({ onConnect }: DatabaseConnectionProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [connectionString, setConnectionString] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = () => {
    if (!connectionString.trim() || !selectedProvider) return

    setIsConnecting(true)
    setTimeout(() => {
      onConnect(connectionString, selectedProvider)
      setIsConnecting(false)
    }, 1500)
  }

  const getPlaceholder = () => {
    switch (selectedProvider) {
      case 'planetscale':
        return 'mysql://username:password@aws.connect.psdb.cloud/database-name?ssl={"rejectUnauthorized":true}'
      case 'neon':
        return 'postgres://user:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb'
      case 'supabase':
        return 'postgres://postgres:password@db.xyz.supabase.co:5432/postgres'
      case 'turso':
        return 'libsql://database-name-username.turso.io'
      default:
        return 'Select a provider first'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Deploy Schema</CardTitle>
        <CardDescription hidden>Choose a database provider to deploy your schema.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {providers.map((provider) => {
            const Icon = provider.icon
            return (
              <Button
                key={provider.id}
                variant='outline'
                className={`h-auto p-4 justify-start ${
                  selectedProvider === provider.id
                    ? `${provider.borderColor} ${provider.bgColor}`
                    : ''
                }`}
                onClick={() => setSelectedProvider(provider.id)}
              >
                <div className='flex items-start'>
                  <div className={`p-2 rounded-lg ${provider.bgColor}`}>
                    <Icon className={`size-5 ${provider.color}`} />
                  </div>
                  <div className='ml-3 text-left'>
                    <h3 className='text-sm font-medium'>{provider.name}</h3>
                    <p className='mt-1 text-xs text-muted-foreground text-ellipsis'>
                      {provider.description}
                    </p>
                  </div>
                </div>
              </Button>
            )
          })}
        </div>

        {selectedProvider && (
          <>
            <div className='space-y-2'>
              <Label htmlFor='connection-string'>Connection URL</Label>
              <Input
                id='connection-string'
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
                placeholder={getPlaceholder()}
              />
            </div>
            <div className='bg-destructive/20 border-l-4 border-destructive p-4'>
              <div className='flex'>
                <AlertCircleIcon className='size-5 text-red-500/90 shrink-0' />
                <p className='ml-3 text-sm text-red-500/90'>
                  We never store your database credentials. They are used exclusively for this
                  connection.
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {selectedProvider && (
        <CardFooter className='flex justify-end'>
          <div className='flex space-x-2'>
            <Button onClick={handleConnect} disabled={isConnecting || !connectionString.trim()}>
              {isConnecting ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-2 h-4 w-4'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Connecting...
                </>
              ) : (
                'Deploy Schema'
              )}
            </Button>
            <Button variant='outline'>Test Connection</Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
