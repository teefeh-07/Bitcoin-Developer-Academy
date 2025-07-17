'use client'

import { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { CodeEditorProps } from '@/types'

export default function CodeEditor({
  initialCode,
  language = 'clarity',
  onCodeChange,
  onRun,
  readOnly = false,
  height = '400px'
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<string>('')
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    // Register Clarity language if not already registered
    if (!monaco.languages.getLanguages().some((lang: any) => lang.id === 'clarity')) {
      monaco.languages.register({ id: 'clarity' })
      
      // Define Clarity syntax highlighting
      monaco.languages.setMonarchTokensProvider('clarity', {
        tokenizer: {
          root: [
            [/\(define-.*?\)/, 'keyword'],
            [/\(let\b/, 'keyword'],
            [/\(if\b/, 'keyword'],
            [/\(begin\b/, 'keyword'],
            [/\(try!\b/, 'keyword'],
            [/\(unwrap!\b/, 'keyword'],
            [/\(asserts!\b/, 'keyword'],
            [/\(map-get\?\b/, 'keyword'],
            [/\(map-set\b/, 'keyword'],
            [/\(var-get\b/, 'keyword'],
            [/\(var-set\b/, 'keyword'],
            [/\(ok\b/, 'keyword'],
            [/\(err\b/, 'keyword'],
            [/\(some\b/, 'keyword'],
            [/\(none\b/, 'keyword'],
            [/u\d+/, 'number'],
            [/".*?"/, 'string'],
            [/;;.*$/, 'comment'],
            [/\(/, 'delimiter.parenthesis'],
            [/\)/, 'delimiter.parenthesis'],
          ]
        }
      })

      // Define theme
      monaco.editor.defineTheme('clarity-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '#569CD6' },
          { token: 'number', foreground: '#B5CEA8' },
          { token: 'string', foreground: '#CE9178' },
          { token: 'comment', foreground: '#6A9955' },
        ],
        colors: {
          'editor.background': '#1E1E1E',
        }
      })
    }
  }

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || ''
    setCode(newCode)
    onCodeChange(newCode)
  }

  const handleRun = async () => {
    if (!onRun) return
    
    setIsRunning(true)
    setOutput('Running code...')
    
    try {
      await onRun(code)
      setOutput('Code executed successfully!')
    } catch (error) {
      setOutput(`Error: ${error}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run()
    }
  }

  return (
    <div className="code-editor border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {language === 'clarity' ? 'Clarity' : language.toUpperCase()} Editor
          </span>
          {!readOnly && (
            <button
              onClick={handleFormat}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
            >
              Format
            </button>
          )}
        </div>
        {onRun && !readOnly && (
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`text-sm px-3 py-1 rounded ${
              isRunning 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        )}
      </div>

      {/* Editor */}
      <Editor
        height={height}
        language={language === 'clarity' ? 'clarity' : language}
        value={code}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        theme="clarity-theme"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
        }}
      />

      {/* Output */}
      {output && (
        <div className="bg-gray-900 text-gray-100 p-3 border-t border-gray-700">
          <div className="text-xs font-medium text-gray-400 mb-1">Output:</div>
          <pre className="text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  )
}
