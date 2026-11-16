"use client"

import { useState } from 'react'

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof window === 'undefined') return
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button 
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        color: copied ? 'var(--accent-teal)' : 'var(--text-secondary)',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      title="Copy link to clipboard"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {copied ? (
          <path d="M20 6 9 17 4 12" />
        ) : (
          <>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </>
        )}
      </svg>
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  )
}
