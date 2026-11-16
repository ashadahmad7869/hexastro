"use client"

import { useState, useRef, ReactNode, ReactElement } from 'react'

interface CustomCodeBlockProps {
  children?: ReactNode
}

export default function CustomCodeBlock({ children, ...props }: CustomCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  // Safely extract the children props to get code and language
  const codeElement = children && typeof children === 'object' && 'type' in children && (children as ReactElement).type === 'code'
    ? (children as ReactElement)
    : null

  const codeProps = codeElement && codeElement.props
    ? (codeElement.props as { className?: string; children?: ReactNode })
    : null

  const className = codeProps && codeProps.className ? codeProps.className : ''
  const matches = className.match(/language-(.*)/)
  const language = matches && matches[1] ? matches[1] : 'text'

  const rawCode = codeProps && codeProps.children ? codeProps.children : ''
  const codeText = typeof rawCode === 'string' ? rawCode.trim() : ''

  const handleCopy = () => {
    if (!codeText) return
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#1e293b',
      border: '1px solid var(--border-color)',
      margin: '2rem 0'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: '#0f172a',
        borderBottom: '1px solid #334155',
        fontSize: '0.75rem',
        fontFamily: 'ui-monospace, monospace',
        color: '#94a3b8'
      }}>
        <span style={{ fontWeight: 600 }}>{language.toUpperCase()}</span>
        <button 
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            color: copied ? 'var(--accent-teal)' : '#94a3b8',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            transition: 'color 0.15s ease'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {copied ? (
              <path d="M20 6 9 17 4 12" />
            ) : (
              <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </>
            )}
          </svg>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      
      <pre 
        ref={codeRef}
        style={{
          margin: 0,
          padding: '1.5rem',
          overflowX: 'auto',
          backgroundColor: 'transparent',
          color: '#f8fafc',
          fontSize: '0.875rem',
          lineHeight: '1.7',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
        }}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
