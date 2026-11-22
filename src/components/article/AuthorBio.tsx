import Image from 'next/image'
import Link from 'next/link'
import { Author } from '@/types/content'
import { getRegisteredAuthor } from '@/lib/services/contentService'

interface AuthorBioProps {
  author: Author
  /** Small label above the name, e.g. "Drafted by" or "Reviewed by" */
  label?: string
}

export default function AuthorBio({ author, label }: AuthorBioProps) {
  const hasProfile = Boolean(getRegisteredAuthor(author.id))
  const links = [
    author.socials?.website && { href: author.socials.website, text: 'Website' },
    author.socials?.linkedin && { href: author.socials.linkedin, text: 'LinkedIn' },
    author.socials?.github && { href: author.socials.github, text: 'GitHub' },
    author.socials?.twitter && { href: author.socials.twitter, text: 'X / Twitter' },
  ].filter(Boolean) as { href: string; text: string }[]

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
        marginTop: '1.5rem',
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
        {label && (
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {label}
          </span>
        )}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {hasProfile ? (
              <Link href={`/authors/${author.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{author.name}</Link>
            ) : author.name}
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
        {links.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem', fontSize: '0.8125rem' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer me">{l.text}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
