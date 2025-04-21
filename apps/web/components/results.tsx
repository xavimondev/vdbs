'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeEditor } from '@/components/code-editor'
import { CheckIcon, CopyIcon, DatabaseIcon, DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeployDialog } from '@/components/deploy-dialog'
import { useState } from 'react'
import { useSchemaStore } from '@/store'
import { toast } from 'sonner'

type ResultsProps = {
  code: string
  finished: boolean
}

export function Results({ code, finished }: ResultsProps) {
  const [showDeployModal, setShowDeployModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const schema = useSchemaStore((store) => store.schema)

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `schema.${'postgresql'}.sql`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast('Downloaded', {
      description: `SQL file has been downloaded as schema.${'postgresql'}.sql`
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.info('Copied to clipboard', {
      description: 'SQL has been copied to your clipboard'
    })
  }

  return (
    <>
      <Card className='border rounded-md shadow-sm p-5'>
        <div className='flex items-center justify-between mb-4'>
          <CardHeader className='p-0'>
            <CardTitle>Generated SQL</CardTitle>
            <CardDescription>This is so cool</CardDescription>
          </CardHeader>
          <div className='flex flex-items gap-2'>
            <Button variant='secondary' onClick={handleCopy}>
              {copied ? (
                <CheckIcon className='h-4 w-4 mr-1' />
              ) : (
                <CopyIcon className='mr-2 size-4' />
              )}
              {copied ? 'Copied' : 'Copy'}
            </Button>
            <Button variant='outline' onClick={handleDownload}>
              <DownloadIcon className='mr-2 size-4' />
              Export
            </Button>
            <Button variant='default' disabled={!finished} onClick={() => setShowDeployModal(true)}>
              <DatabaseIcon className='mr-2 size-4' />
              Deploy
            </Button>
          </div>
        </div>
        <CardContent className='p-0'>
          <CodeEditor code={code} />
          {/* Table details */}
          <div className='space-y-4 pt-4'>
            <div className='pt-3 border-t'>
              <h3 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2'>
                Detected Tables(<span>{schema?.tables.length ?? 0}</span>)
              </h3>
              {schema?.tables && schema.tables.length > 0 && (
                <ul className='text-sm space-y-2'>
                  {schema.tables.map((table) => (
                    <li key={table} className='flex justify-between'>
                      <span className='text-muted-foreground'>{table}</span>
                      <span>3 columns</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <DeployDialog
        open={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        sqlFormat={'postgresql'}
        sqlCode={code}
      />
    </>
  )
}
