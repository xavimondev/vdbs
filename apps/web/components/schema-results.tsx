'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CodeEditor } from '@/components/code-editor'
import { CheckIcon, CopyIcon, DownloadIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useSchemaStore } from '@/store'
import { toast } from 'sonner'

export function SchemaResults() {
  const [copied, setCopied] = useState(false)
  const schema = useSchemaStore((store) => store.schema)
  const { sqlSchema } = schema ?? {}

  const handleCopy = () => {
    if (!sqlSchema) return

    navigator.clipboard.writeText(sqlSchema)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast.info('SQL has been copied to your clipboard')
  }

  const handleDownload = () => {
    if (!sqlSchema) return

    const blob = new Blob([sqlSchema], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `schema.sql`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className='border rounded-md shadow-sm p-5'>
      <div className='flex items-center justify-between mb-4'>
        <CardHeader className='p-0'>
          <CardTitle>Generated SQL</CardTitle>
          <CardDescription hidden>Database Schema</CardDescription>
        </CardHeader>
        <div className='flex flex-items gap-2'>
          <Button size='sm' variant='secondary' onClick={handleCopy}>
            {copied ? <CheckIcon className='size-4 mr-1' /> : <CopyIcon className='mr-1 size-4' />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button size='sm' variant='outline' onClick={handleDownload}>
            <DownloadIcon className='mr-1 size-4' />
            Export
          </Button>
        </div>
      </div>
      <CardContent className='p-0'>{sqlSchema && <CodeEditor code={sqlSchema} />}</CardContent>
    </Card>
  )
}
