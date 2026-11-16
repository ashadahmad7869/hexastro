"use client"

import { useEffect, useState } from 'react'

export interface Heading {
  text: string
  id: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visibleSections.length > 0) {
          setActiveId(visibleSections[0].target.id)
        }
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0.1,
      }
    )

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings || headings.length === 0) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h4 style={{
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.05em',
        color: 'var(--text-tertiary)',
        marginBottom: '1rem',
        marginTop: 0
      }}>
        On This Page
      </h4>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            style={{
              display: 'block',
              paddingLeft: heading.level === 3 ? '1rem' : '0',
              color: activeId === heading.id ? 'var(--accent-blue)' : 'var(--text-secondary)',
              fontWeight: activeId === heading.id ? 600 : 400,
              fontSize: heading.level === 3 ? '0.8125rem' : '0.875rem',
              lineHeight: 1.4,
              transition: 'color 0.15s ease',
              textDecoration: 'none'
            }}
            className="toc-link"
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
