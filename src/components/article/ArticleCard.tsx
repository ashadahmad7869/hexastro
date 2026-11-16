import Link from 'next/link'
import Image from 'next/image'
import { ContentType } from '@/types/content'

export interface ArticleCardProps {
  slug: string
  title: string
  excerpt: string
  tag: string // Used as the category name
  date: string
  readTime: string
  author: string | { name: string; avatar: string }
  featured?: boolean
  tags?: string[]
  contentType?: ContentType
}

const getCoverImage = (slug: string) => {
  switch (slug) {
    case 'first-post':
      return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop'
    case 'inside-transformer':
      return 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop'
    case 'mapping-invisible-mass':
      return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop'
    case 'scientific-computing-python':
      return 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop'
    case 'scaling-laws-llm':
      return 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop'
    case 'riemann-hypothesis':
      return 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop'
    default:
      return 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop'
  }
}

const getTypeBadgeText = (type?: ContentType) => {
  switch (type) {
    case 'guide': return 'Guide'
    case 'debrief': return 'Research'
    case 'exploration': return 'Essay'
    default: return 'Essay'
  }
}

const getTypeBadgeColor = (type?: ContentType) => {
  switch (type) {
    case 'guide': return '#10b981' // emerald green
    case 'debrief': return '#ef4444' // red
    case 'exploration': return '#2563eb' // royal blue (contrasts with red/green)
    default: return '#2563eb'
  }
}

export default function ArticleCard({ 
  slug, 
  title, 
  excerpt, 
  tag, 
  date, 
  readTime, 
  author, 
  featured = false,
  tags = [],
  contentType = 'exploration'
}: ArticleCardProps) {
  const authorName = typeof author === 'string' ? author : author.name
  const authorAvatar = typeof author === 'string' ? '/authors/hexastro.svg' : author.avatar
  const coverImage = getCoverImage(slug)

  return (
    <div style={{
      position: 'relative',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      height: '100%',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
      /* overflow: hidden is removed here to allow the top-left badge to overflow the border */
    }}
    className="btn-outline-card"
    >
      {/* Overflow Type Badge at the top-left border */}
      <div style={{ 
        position: 'absolute', 
        top: '-15px', 
        left: '20px', 
        backgroundColor: getTypeBadgeColor(contentType), 
        color: 'white',
        padding: '0.45rem 1.15rem', 
        borderRadius: '6px',
        fontSize: '0.8125rem',
        fontWeight: 700,
        boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
        zIndex: 10,
        letterSpacing: '0.01em',
        fontFamily: 'inherit'
      }}>
        {getTypeBadgeText(contentType)}
      </div>

      {/* Cover Image Container */}
      <div style={{ 
        position: 'relative', 
        height: featured ? '360px' : '220px', 
        width: '100%', 
        backgroundColor: 'var(--bg-secondary)', 
        overflow: 'hidden',
        borderRadius: '15px 15px 0 0' // Rounds image top corners since parent overflow is disabled
      }}>
        <Image 
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          priority={featured}
        />
      </div>

      {/* Card Content body */}
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Category tag label placed above the title */}
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            {tag}
          </span>
        </div>

        <Link href={`/posts/${slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ 
            fontSize: featured ? '1.75rem' : '1.35rem', 
            fontWeight: 800, 
            marginBottom: '1rem', 
            color: 'var(--text-primary)', 
            lineHeight: 1.3,
            letterSpacing: '-0.01em'
          }}>
            {title}
          </h3>
        </Link>
        
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: featured ? '1rem' : '0.925rem', 
          marginBottom: '1.5rem', 
          flexGrow: 1, 
          lineHeight: 1.6 
        }}>
          {excerpt}
        </p>

        {/* Tags badge list */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {tags.map(item => (
              <span 
                key={item} 
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-secondary)', 
                  fontSize: '0.75rem', 
                  fontWeight: 600, 
                  padding: '0.25rem 0.625rem', 
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)'
                }}
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Author Metadata */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          fontSize: '0.8125rem', 
          color: 'var(--text-secondary)', 
          borderTop: '1px solid var(--border-color)', 
          paddingTop: '1.25rem',
          marginTop: 'auto'
        }}>
          <div style={{ position: 'relative', width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden' }}>
             <Image 
               src={authorAvatar} 
               alt={authorName} 
               fill
               sizes="28px"
               style={{ objectFit: 'cover' }}
             />
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{authorName}</span>
          <span>•</span>
          {featured && (
            <>
              <span>{date}</span>
              <span>•</span>
            </>
          )}
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  )
}
