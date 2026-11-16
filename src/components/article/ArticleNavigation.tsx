import Link from 'next/link'

interface AdjacentArticle {
  slug: string
  title: string
}

interface ArticleNavigationProps {
  previous: AdjacentArticle | null
  next: AdjacentArticle | null
}

export default function ArticleNavigation({ previous, next }: ArticleNavigationProps) {
  if (!previous && !next) return null

  return (
    <nav style={{
      display: 'grid',
      gridTemplateColumns: previous && next ? '1fr 1fr' : '1fr',
      gap: '2rem',
      marginTop: '4rem',
      paddingTop: '2rem',
      borderTop: '1px solid var(--border-color)'
    }}>
      {previous ? (
        <Link 
          href={`/posts/${previous.slug}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            textDecoration: 'none',
            transition: 'border-color 0.2s ease',
          }}
          className="btn-outline-card"
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            &larr; Previous Transmission
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {previous.title}
          </span>
        </Link>
      ) : <div />}

      {next ? (
        <Link 
          href={`/posts/${next.slug}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.5rem',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            textDecoration: 'none',
            textAlign: 'right',
            transition: 'border-color 0.2s ease',
          }}
          className="btn-outline-card"
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
            Next Transmission &rarr;
          </span>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {next.title}
          </span>
        </Link>
      ) : <div />}
    </nav>
  )
}
