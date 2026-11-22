import type { ReactNode } from 'react'
import type { Author } from '@/types/content'

const iconProps = { width: 16, height: 16, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false } as const

const icons: Record<string, ReactNode> = {
  website: (
    <svg {...iconProps} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  linkedin: (
    <svg {...iconProps} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  github: (
    <svg {...iconProps} fill="currentColor">
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.82-.26.82-.57v-2c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  ),
  twitter: (
    <svg {...iconProps} fill="currentColor">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z" />
    </svg>
  ),
}

const labels: Record<string, string> = { website: 'Website', linkedin: 'LinkedIn', github: 'GitHub', twitter: 'X' }

export default function SocialLinks({ socials, size = 'sm' }: { socials?: Author['socials']; size?: 'sm' | 'md' }) {
  if (!socials) return null
  const entries = (['website', 'linkedin', 'github', 'twitter'] as const)
    .map((k) => [k, socials[k]] as const)
    .filter((e): e is readonly [(typeof e)[0], string] => Boolean(e[1]))
  if (entries.length === 0) return null

  return (
    <div style={{ display: 'flex', gap: size === 'md' ? '1.25rem' : '1rem', flexWrap: 'wrap', marginTop: size === 'md' ? '1rem' : '0.5rem', fontSize: size === 'md' ? '0.9375rem' : '0.8125rem' }}>
      {entries.map(([key, href]) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer me"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}
        >
          {icons[key]}
          {labels[key]}
        </a>
      ))}
    </div>
  )
}
