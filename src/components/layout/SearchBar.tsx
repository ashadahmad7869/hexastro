"use client"

import { useState, useRef, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  isFocused: boolean
  setIsFocused: (focused: boolean) => void
}

export default function SearchBar({ isFocused, setIsFocused }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Initialize input query from URL search parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const searchVal = params.get('search')
      if (searchVal) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuery(searchVal)
      }
    }
  }, [])

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/posts?search=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form
      onSubmit={handleSearchSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: isFocused ? '320px' : '160px', // Statically doubles in size on focus
          height: '38px',
          padding: '0 1rem 0 2.25rem',
          borderRadius: '9999px',
          border: '1px solid var(--border-color)',
          borderColor: isFocused ? 'var(--accent-blue)' : 'var(--border-color)',
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          outline: 'none',
          cursor: 'text',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          caretColor: 'var(--accent-blue)',
          boxShadow: isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
        }}
        title="Search articles"
      />
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          position: 'absolute',
          left: '0.875rem',
          transform: 'translateY(-50%)',
          top: '50%',
          color: isFocused ? 'var(--accent-blue)' : 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
    </form>
  )
}
