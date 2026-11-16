import Link from 'next/link'
import { Article } from '@/types/content'

interface PairedPostBoxProps {
  current: Article
  paired?: Article
}

// Links a concept guide to its paper debrief (and back).
export default function PairedPostBox({ current, paired }: PairedPostBoxProps) {
  if (!paired) return null
  const isGuide = current.contentType === 'guide'
  const label = isGuide ? '📄 See it in action' : '🎓 The concept behind this paper'
  const blurb = isGuide
    ? 'A new arXiv paper that puts this idea to work, explained.'
    : 'New to the idea? Start with the fundamentals.'

  return (
    <aside style={{
      margin: '2.5rem 0 1.5rem',
      padding: '1.25rem 1.5rem',
      borderRadius: '12px',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
    }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
        {label}
      </div>
      <Link href={`/posts/${paired.slug}`} style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'none' }}>
        {paired.title} &rarr;
      </Link>
      <p style={{ margin: '0.375rem 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{blurb}</p>
    </aside>
  )
}
