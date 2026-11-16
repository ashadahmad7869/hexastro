import Link from 'next/link'
import TableOfContents, { Heading } from './TableOfContents'
import { Article } from '@/types/content'

interface ArticleSidebarProps {
  headings: Heading[]
  article: Article
  featuredArticle: Article | null
  pinnedArticle: Article | null
}

export default function ArticleSidebar({
  headings,
  article,
  featuredArticle,
  pinnedArticle
}: ArticleSidebarProps) {
  return (
    <aside 
      className="toc-sidebar"
      style={{
        position: 'sticky',
        top: '120px',
        maxHeight: 'calc(100vh - 160px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '240px',
        paddingLeft: '1.5rem',
        borderLeft: '1px solid var(--border-color)',
      }}
    >
      {/* 1. Article Publish Information */}
      <section style={{ 
        paddingBottom: '1.5rem', 
        borderBottom: '1px solid var(--border-color)',
        fontSize: '0.8125rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <h4 style={{
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          color: 'var(--text-tertiary)',
          margin: 0
        }}>
          Metadata
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div>
            <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Published:</span>{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{article.date}</span>
          </div>
          {article.updated && article.updated !== article.date && (
            <div>
              <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Updated:</span>{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{article.updated}</span>
            </div>
          )}
          <div>
            <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Read Time:</span>{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{article.readTime}</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-tertiary)', fontWeight: 500 }}>Difficulty:</span>{' '}
            <span style={{ 
              fontWeight: 700, 
              color: article.difficulty === 'Advanced' 
                ? 'var(--accent-purple)' 
                : article.difficulty === 'Beginner' 
                  ? 'var(--accent-teal)' 
                  : 'var(--accent-blue)' 
            }}>
              {article.difficulty || 'Intermediate'}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Table of Contents */}
      {headings.length > 0 && (
        <section style={{ 
          paddingBottom: '1.5rem', 
          borderBottom: '1px solid var(--border-color)',
        }}>
          <TableOfContents headings={headings} />
        </section>
      )}

      {/* 3. Tags */}
      {article.tags.length > 0 && (
        <section style={{ 
          paddingBottom: '1.5rem', 
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <h4 style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color: 'var(--text-tertiary)',
            margin: 0
          }}>
            Tags
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  padding: '0.25rem 0.625rem',
                  borderRadius: '6px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none'
                }}
                className="toc-tag"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. Featured Article of the Day */}
      {featuredArticle && featuredArticle.slug !== article.slug && (
        <section style={{ 
          paddingBottom: '1.5rem', 
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <h4 style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color: 'var(--text-tertiary)',
            margin: 0
          }}>
            Featured Today
          </h4>
          <Link 
            href={`/posts/${featuredArticle.slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              textDecoration: 'none'
            }}
            className="sidebar-article-link"
          >
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>
              {featuredArticle.category}
            </span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {featuredArticle.title}
            </span>
          </Link>
        </section>
      )}

      {/* 5. Pinned Article */}
      {pinnedArticle && pinnedArticle.slug !== article.slug && (
        <section style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <h4 style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color: 'var(--text-tertiary)',
            margin: 0
          }}>
            Pinned Transmission
          </h4>
          <Link 
            href={`/posts/${pinnedArticle.slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              textDecoration: 'none'
            }}
            className="sidebar-article-link"
          >
            <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--accent-purple)', textTransform: 'uppercase' }}>
              {pinnedArticle.category}
            </span>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {pinnedArticle.title}
            </span>
          </Link>
        </section>
      )}
    </aside>
  )
}
