import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeEditor } from '@/components/code-editor'
import { RunCommand } from '@/components/run-command'
import { DeploySchema } from '@/components/deploy-schema'

type ResultsProps = {
  code: string
  finished: boolean
}

export function Results({ code, finished }: ResultsProps) {
  return (
    <Tabs defaultValue='sqlschema' className='size-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='sqlschema'>SQL Schema</TabsTrigger>
        <TabsTrigger value='migration' disabled={!finished}>
          Migration
        </TabsTrigger>
      </TabsList>
      <TabsContent value='sqlschema'>
        <CodeEditor code={code} />
      </TabsContent>
      <TabsContent value='migration'>
        <div className='flex flex-col gap-2 justify-between'>
          <Card className='size-full'>
            <CardHeader className='p-4'>
              <CardTitle className='text-lg'>Run command</CardTitle>
              <CardDescription>
                Run this command locally to create a script of your database migration.
              </CardDescription>
            </CardHeader>
            <CardContent className='px-4'>
              <RunCommand />
            </CardContent>
          </Card>
          <DeploySchema />
        </div>
      </TabsContent>
    </Tabs>
  )
}
