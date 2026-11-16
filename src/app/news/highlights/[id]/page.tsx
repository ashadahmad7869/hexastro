import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { newsHighlights } from '@/config/news'
import { contentService } from '@/lib/services/contentService'
import CopyLinkButton from '@/components/article/CopyLinkButton'

export const dynamicParams = false

export function generateStaticParams() {
  return newsHighlights.map((item) => ({
    id: item.id,
  }))
}

export default async function NewsDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const post = newsHighlights.find(item => item.id === params.id)
  
  if (!post) {
    notFound()
  }

  // Fetch other news highlights
  const otherNews = newsHighlights.filter(item => item.id !== post.id).slice(0, 2)

  // Fetch "Don't Miss" articles
  const dontMiss = contentService.getAllArticles().slice(0, 2)

  return (
    <div className="article-layout">
      {/* Left Column: Navigation & Metadata (Sticky on Desktop) */}
      <aside style={{
        position: 'sticky',
        top: '120px',
        maxHeight: 'calc(100vh - 160px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        width: '220px',
        paddingRight: '1.5rem',
        borderRight: '1px solid var(--border-color)',
      }}
      className="left-sidebar"
      >
        <Link 
          href="/news/highlights" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
            transition: 'color 0.2s'
          }}
          className="toc-link"
        >
          &larr; Back to News
        </Link>

        {/* News Source info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h4 style={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color: 'var(--text-tertiary)',
            margin: 0
          }}>
            Information
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Source:</span>{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{post.source}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-tertiary)' }}>Published:</span>{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{post.date}</strong>
            </div>
          </div>
        </div>
      </aside>

      {/* Center Column: Centered News Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <article>
          <header style={{ marginBottom: '3rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              gap: '1rem', 
              marginBottom: '1.5rem' 
            }}>
              <span style={{ 
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--accent-blue)',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderRadius: '9999px',
                letterSpacing: '0.05em'
              }}>
                {post.category}
              </span>
              <CopyLinkButton />
            </div>

            <h1 style={{ 
              fontSize: '2.75rem', 
              lineHeight: '1.2',
              letterSpacing: '-0.04em', 
              marginBottom: '2rem', 
              color: 'var(--text-primary)',
              fontWeight: 800
            }}>
              {post.title}
            </h1>
          </header>

          {/* Big Featured Image */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: '400px', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            marginBottom: '2.5rem',
            border: '1px solid var(--border-color)'
          }}>
            <Image 
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>

          {/* News Excerpt Callout */}
          <div style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.65,
            borderLeft: '4px solid var(--accent-blue)',
            paddingLeft: '1.5rem',
            fontStyle: 'italic',
            marginBottom: '2.5rem',
            backgroundColor: 'var(--bg-secondary)',
            padding: '1.5rem 1.5rem 1.5rem 1.75rem',
            borderRadius: '0 12px 12px 0'
          }}>
            {post.excerpt}
          </div>

          {/* News Body Text Content */}
          <div className="prose">
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '0 0 2rem 0' }}>
              {post.content}
            </p>
          </div>
        </article>
      </div>

      {/* Right Column: Other Highlights & Don't Miss Sidebar (Sticky on Desktop) */}
      <aside style={{
        position: 'sticky',
        top: '120px',
        maxHeight: 'calc(100vh - 160px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        width: '280px',
        paddingLeft: '1.5rem',
        borderLeft: '1px solid var(--border-color)',
      }}
      className="right-sidebar"
      >
        {/* Other Highlights Section */}
        {otherNews.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-purple)',
              margin: 0
            }}>
              📢 Other News
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {otherNews.map(item => (
                <Link 
                  key={item.id} 
                  href={`/news/highlights/${item.id}`} 
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                  className="sidebar-article-link"
                >
                  <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="280px"
                    />
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Don't Miss Section */}
        {dontMiss.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h4 style={{
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              color: 'var(--accent-blue)',
              margin: 0
            }}>
              🔥 Don&apos;t Miss
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {dontMiss.map(item => {
                let coverImg = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop'
                if (item.slug === 'inside-transformer') coverImg = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
                if (item.slug === 'mapping-invisible-mass') coverImg = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
                return (
                  <Link 
                    key={item.slug} 
                    href={`/posts/${item.slug}`} 
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    className="sidebar-article-link"
                  >
                    <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <Image 
                        src={coverImg} 
                        alt={item.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        sizes="280px"
                      />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {item.title}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
