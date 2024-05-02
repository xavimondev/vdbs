'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { CircleAlert, Loader2 } from 'lucide-react'
import { getReferenceId, triggerConfetti } from '@/utils'
import { useSchemaStore } from '@/store'
import { schemaDeploy } from '@/services/deploy'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { DeployResult } from '@/components/deploy-result'

export function DeploySchema() {
  const schema = useSchemaStore((state) => state.schema)
  const setSupabaseLinkTables = useSchemaStore((state) => state.setSupabaseLinkTables)
  const supabaseLinkTables = useSchemaStore((state) => state.supabaseLinkTables)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const deploy = async () => {
    const urlConnection = inputRef.current?.value
    if (!urlConnection) {
      toast.error('Database connection string is missing.')
      return
    }

    const isEmptyPassword = urlConnection.includes('[YOUR-PASSWORD]')

    if (!schema) return

    const { sqlSchema } = schema

    if (sqlSchema.trim() === '' || isEmptyPassword) {
      toast.error('Please replace [YOUR-PASSWORD] with your actual database password.')
      return
    }

    setIsLoading(true)
    const result = await schemaDeploy({
      sqlSchema,
      url: urlConnection
    })

    const { error, message } = result
    if (error) {
      toast.error(error)
      setIsLoading(false)
      return
    }

    toast.success(message)
    triggerConfetti()
    setIsLoading(false)

    //Setting redirect URL dashboard tables
    const referenceId = getReferenceId(urlConnection)
    const supabaseLinkTables = `https://supabase.com/dashboard/project/${referenceId}/editor`
    setSupabaseLinkTables(supabaseLinkTables)
  }

  return (
    <Card className='size-full'>
      <CardHeader className='p-4'>
        <CardTitle className='text-lg'>Connect project</CardTitle>
        <CardDescription>Deploy your migration script to your Supabase project.</CardDescription>
      </CardHeader>
      <CardContent className='px-4'>
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <Label>Database Connection URL</Label>
                <Input
                  className='w-full placeholder:text-muted-foreground/50'
                  ref={inputRef}
                  placeholder='postgres://postgres.[referenceId]:[YOUR-PASSWORD]@[cloud]-0-[region].pooler.supabase.com:5432/postgres'
                />
              </div>
              <p className='text-[13px] text-foreground/75'>
                You can find your Supabase database connection URL in your{' '}
                <Link
                  href='https://supabase.com/dashboard/project/_/settings/database'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='underline font-medium text-primary'
                >
                  database settings
                </Link>{' '}
                in the Supabase dashboard.
              </p>
            </div>
            <Alert variant='destructive' className='bg-destructive/20'>
              <CircleAlert className='size-5 text-red-500/90' />
              <AlertTitle className='font-medium text-base text-red-500/90'>
                We never store your database credentials
              </AlertTitle>
              <AlertDescription className='text-red-500/90'>
                The credentials you provide are used exclusively for validating your database
                connection. You can examine the{' '}
                <Link
                  href='https://github.com/xavimon/supamigration'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-medium underline'
                >
                  source code
                </Link>{' '}
                for verification.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
      <CardFooter className='w-full px-4 flex-col gap-4 xl:gap-8'>
        <Button className='w-full' onClick={deploy} disabled={isLoading}>
          {isLoading && <Loader2 className='animate-spin size-5 mr-2' />}
          {isLoading ? 'Deploying...' : 'Deploy'}
        </Button>
        {supabaseLinkTables && supabaseLinkTables !== '' && (
          <DeployResult supabaseLinkTables={supabaseLinkTables} />
        )}
      </CardFooter>
    </Card>
  )
}
