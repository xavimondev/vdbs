import React, { FormEvent, useState } from 'react'
import { AlertCircleIcon, Loader2Icon } from 'lucide-react'
import { toast } from 'sonner'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { SupabaseIc, NeonIc } from '@/components/icons'
import { useSchemaStore } from '@/store'
import { triggerConfetti } from '@/utils'
import {
  validateNeonConnectionString,
  validateSupabaseConnectionString
} from '@/utils/connection-string-validations'

const providers = [
  {
    id: 'neon',
    name: 'Neon',
    icon: NeonIc,
    description: 'Ship faster with Postgres',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    icon: SupabaseIc,
    description: 'Open source Firebase alternative',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    borderColor: 'border-emerald-200 dark:border-emerald-800'
  }
  // {
  //   id: 'planetscale',
  //   name: 'PlanetScale',
  //   icon: GlobeIcon,
  //   description: `The world's fastest relational database`,
  //   color: 'text-purple-600 dark:text-purple-400',
  //   bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  //   borderColor: 'border-purple-200 dark:border-purple-800'
  // },
  // {
  //   id: 'turso',
  //   name: 'Turso',
  //   icon: TursoIc,
  //   description: 'SQLite Databases for all Apps',
  //   color: 'text-blue-600 dark:text-blue-400',
  //   bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  //   borderColor: 'border-blue-200 dark:border-blue-800'
  // }
]

export function DatabaseDeployments() {
  const [selectedProvider, setSelectedProvider] = useState('neon')
  const [isDeploying, setIsDeploying] = useState(false)
  const schema = useSchemaStore((store) => store.schema)

  if (schema && schema.databaseFormat !== 'postgresql') return null

  const isConnectionStringValid = (connectionString: string) => {
    if (!connectionString.trim() || !schema) {
      toast.error('Database connection string is missing.')
      return false
    }

    if (selectedProvider === 'neon') {
      const { isValid, errorMessage } = validateNeonConnectionString(connectionString)
      if (!isValid) {
        toast.error(errorMessage)
        return false
      }
    } else if (selectedProvider === 'supabase') {
      const { isValid, errorMessage } = validateSupabaseConnectionString(connectionString)
      if (!isValid) {
        toast.error(errorMessage)
        return false
      }
    }

    return true
  }

  const handleDeploy = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const connectionStringInput = form.elements.namedItem('connectionString') as HTMLInputElement
    const connectionString = connectionStringInput.value

    const isValid = isConnectionStringValid(connectionString)
    if (!isValid) return

    setIsDeploying(true)

    try {
      const response = await fetch('api/deploy', {
        method: 'POST',
        body: JSON.stringify({
          url: connectionString,
          sqlSchema: schema!.sqlSchema
        }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      const data = await response.json()
      const { error, message } = data
      if (error) {
        throw new Error(error)
      }

      toast.message(message)

      triggerConfetti()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsDeploying(false)
      form.reset()
    }
  }

  const getPlaceholder = () => {
    switch (selectedProvider) {
      case 'neon':
        return 'postgresql://[ROLE]:[PASSWORD]@[INSTANCE].west-001.aws.neon.tech/neondb'
      case 'supabase':
        return 'postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-SUPABASE-ID].supabase.co:5432/postgres'
      default:
        return 'Select a provider first'
    }
  }

  // const testConnection = async () => {
  //   const isValid = isConnectionStringValid()
  //   if (!isValid) return

  //   const connectionString = inputRef.current?.value

  //   setIsTesting(true)

  //   try {
  //     const response = await fetch('api/test-connection', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         url: connectionString,
  //         provider: selectedProvider
  //       }),
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     })
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     toast.error('An error has ocurred while deploying data')
  //   } finally {
  //     setIsTesting(false)
  //   }
  // }

  return (
    <form className='space-y-2 size-full' onSubmit={handleDeploy}>
      <Card className='size-full'>
        <CardHeader>
          <CardTitle>Deploy Schema</CardTitle>
          <CardDescription hidden>
            Choose a database provider to deploy your schema.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-col gap-2'>
            {providers.map((provider) => {
              const Icon = provider.icon
              return (
                <Button
                  key={provider.id}
                  variant='outline'
                  type='button'
                  className={`h-auto p-3 justify-start ${
                    selectedProvider === provider.id
                      ? `${provider.borderColor} ${provider.bgColor}`
                      : ''
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <div className='flex items-start'>
                    <div className={`p-2 rounded-lg ${provider.bgColor}`}>
                      <Icon className='size-5' />
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
                <Label htmlFor='connectionString'>Connection URL</Label>
                <Input
                  id='connectionString'
                  name='connectionString'
                  placeholder={getPlaceholder()}
                />
              </div>

              <Alert variant='destructive' className='bg-destructive/20'>
                <AlertCircleIcon className='size-5 text-red-500/90' />
                <AlertTitle hidden className='font-medium text-red-500/90'>
                  We never store your database credentials
                </AlertTitle>
                <AlertDescription className='text-red-500/90 text-sm'>
                  We never store your database credentials. They are used exclusively for this
                  connection.
                </AlertDescription>
              </Alert>
            </>
          )}
        </CardContent>
        <CardFooter className='flex justify-end'>
          <div className='flex space-x-2'>
            <Button disabled={isDeploying} type='submit'>
              {isDeploying && <Loader2Icon className='animate-spin size-5 mr-2' />}
              {isDeploying ? 'Deploying...' : 'Deploy'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
