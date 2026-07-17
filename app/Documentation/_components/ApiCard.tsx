"use client"

import { useState } from 'react'
import { Copy, Check, Code } from 'lucide-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

/* ── CopyBtn ────────────────────────────── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 p-2 rounded-sm bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 transition-colors backdrop-blur-sm"
      aria-label="Copy snippet"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-zinc-400" />}
    </button>
  )
}

/* ── Syntax block ───────────────────────── */
function CodeBlock({ code, language = 'json' }: { code: string; language?: string }) {
  return (
    <div className="relative">
      <div className="bg-zinc-950 rounded-sm overflow-hidden border border-zinc-800">
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          showLineNumbers
          lineNumberStyle={{ color: '#52525b', paddingRight: '0.75rem', userSelect: 'none' }}
          customStyle={{ margin: 0, padding: '1rem', background: 'transparent', fontSize: '0.8rem', lineHeight: '1.6' }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <CopyBtn text={code} />
    </div>
  )
}

/* ── Section Title ──────────────────────── */
export function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-100 flex items-center gap-2">
      {icon && <span className="text-indigo-500">{icon}</span>}
      {children}
    </h2>
  )
}

/* ── Transport badges ──────────────────── */
function HttpBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-indigo-100 text-indigo-700 text-[10px] font-mono font-semibold">
      HTTP
    </span>
  )
}
function TcpBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-sky-100 text-sky-700 text-[10px] font-mono font-semibold">
      TCP
    </span>
  )
}

/* ── ApiEndpoint card ───────────────────── */
interface ApiEndpointProps {
  title: string
  description: string
  requestBody?: object
  responseBody?: object
  transport?: 'http' | 'tcp' | 'both'
  note?: string
}

export function ApiCard({ title, description, requestBody, responseBody, transport = 'http', note }: ApiEndpointProps) {
  return (
    <div className="mb-6 p-6 bg-white rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="shrink-0 flex items-center gap-1.5">
          {transport === 'http' && <HttpBadge />}
          {transport === 'tcp' && <TcpBadge />}
          {transport === 'both' && <><HttpBadge /><TcpBadge /></>}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{description}</p>

      {note && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-sm text-xs text-amber-800">
          {note}
        </div>
      )}

      <div className="space-y-3">
        {requestBody && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Request Body</h4>
            <CodeBlock code={JSON.stringify(requestBody, null, 2)} />
          </div>
        )}
        {responseBody && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Response Body</h4>
            <CodeBlock code={JSON.stringify(responseBody, null, 2)} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Binary frame spec block ────────────── */
export function BinaryFrameSpec() {
  const spec = `[4 bytes] frame length (uint32 BE)
  [4 bytes] key count (uint32 BE)
  For each key:
    [2 bytes] key length (uint16 BE)
    [N bytes] key (UTF-8)
    [4 bytes] point count (uint32 BE)
    For each point:
      [8 bytes] timestamp (int64 BE)
      [8 bytes] value (float64 IEEE 754 BE)`

  return (
    <div className="mb-10 p-6 bg-white rounded-sm border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Code className="h-5 w-5 text-indigo-500" />
        Binary Frame Format
      </h3>
      <p className="text-sm text-gray-500 mb-4">Each binary response is a single TCP frame:</p>
      <CodeBlock code={spec} language="plaintext" />
    </div>
  )
}
