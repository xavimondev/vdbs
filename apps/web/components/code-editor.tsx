'use client'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useMonaco } from '@monaco-editor/react'
import { LoaderIcon } from 'lucide-react'

const Monaco = dynamic(() => import('@monaco-editor/react'), { ssr: false })

type CodeEditorProps = {
  code: string
}

export function CodeEditor({ code }: CodeEditorProps) {
  const monaco = useMonaco()

  useEffect(() => {
    if (!monaco) return
    // https://github.com/brijeshb42/monaco-themes/tree/master/src
    monaco.editor.defineTheme('vs-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        {
          background: '141414',
          token: ''
        },
        {
          foreground: '5f5a60',
          fontStyle: 'italic',
          token: 'comment'
        },
        {
          foreground: 'cf6a4c',
          token: 'constant'
        },
        {
          foreground: '9b703f',
          token: 'entity'
        },
        {
          foreground: 'cda869',
          token: 'keyword'
        },
        {
          foreground: 'f9ee98',
          token: 'storage'
        },
        {
          foreground: '8f9d6a',
          token: 'string'
        },
        {
          foreground: '9b859d',
          token: 'support'
        },
        {
          foreground: '7587a6',
          token: 'variable'
        },
        {
          foreground: 'daefa3',
          token: 'string source'
        },
        {
          foreground: 'ddf2a4',
          token: 'string constant'
        },
        {
          foreground: 'e9c062',
          token: 'string.regexp'
        }
      ],
      colors: {
        'editor.foreground': '#F8F8F8',
        'editor.background': '#111010',
        'editor.selectionBackground': '#DDF0FF33',
        'editor.lineHighlightBackground': '#FFFFFF08',
        'editorCursor.foreground': '#A7A7A7',
        'editorWhitespace.foreground': '#FFFFFF40'
      }
    })
  }, [monaco])

  useEffect(() => {
    if (!monaco) return
    monaco.editor.getModels()[0]?.setValue(code || '')
  }, [code])

  return (
    <Monaco
      height='100%'
      theme='vs-dark'
      value={code}
      className='lg:h-[calc(100vh-233px)]'
      loading={
        <div className='flex items-center justify-center'>
          <LoaderIcon />
        </div>
      }
      options={{
        readOnly: false,
        padding: {
          top: 20
        },
        cursorSmoothCaretAnimation: 'on',
        language: 'sql',
        cursorBlinking: 'smooth',
        fontSize: 16,
        formatOnType: true,
        formatOnPaste: true,
        automaticLayout: true,
        wordWrap: 'wordWrapColumn',
        wordWrapColumn: 80,
        minimap: {
          enabled: false
        },
        tabSize: 2
      }}
      defaultLanguage='sql'
    />
  )
}
