import Image from 'next/image'
import { Author } from '@/types/content'

interface AuthorBioProps {
  author: Author
}

export default function AuthorBio({ author }: AuthorBioProps) {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1.5rem',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        marginTop: '3rem',
        alignItems: 'center'
      }} 
      className="author-bio-container"
    >
      <div style={{ flexShrink: 0, position: 'relative', width: '80px', height: '80px' }}>
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          sizes="80px"
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {author.name}
          </h4>
          {author.role && (
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
              {author.role}
            </span>
          )}
        </div>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {author.bio || 'Scientific writer and contributor at HexAstro.'}
        </p>
      </div>
    </div>
  )
}
