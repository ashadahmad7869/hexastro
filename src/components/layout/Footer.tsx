"use client"

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

export default function Footer() {
  const { logo, name, description, socials, navigation } = siteConfig
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{ 
      backgroundColor: '#0f172a', // Deep dark slate background
      color: '#cbd5e1', // Slate light text color
      padding: '5rem 0 3rem 0', 
      marginTop: '6rem', 
      borderTop: '1px solid #1e293b' 
    }}>
      <div className="container">
        {/* Grid columns - 4 Column Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '3rem', 
          marginBottom: '4rem' 
        }}>

          {/* Column 1: Brand details */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={logo.width} 
                height={logo.height} 
                style={{ 
                  height: logo.footerDisplayHeight, 
                  width: 'auto',
                  filter: 'brightness(0) invert(1)' // Inverts dark logo color to white
                }} 
              />
            </Link>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', maxWidth: '300px', marginBottom: '1.75rem', lineHeight: 1.6 }}>
              {description}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socials.map(social => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    border: '1px solid #334155', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#1e293b'
                  }}
                  className="toc-link"
                  title={social.name}
                >
                  <span style={{ fontSize: '10px', fontWeight: 700 }}>{social.iconKey}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Pages navigation list */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', color: '#ffffff', letterSpacing: '-0.01em' }}>Pages</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              {navigation.main.map(link => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }}
                  className="nav-link-dark"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Legal & Team navigation list */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.5rem', color: '#ffffff', letterSpacing: '-0.01em' }}>Legal & Team</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem' }}>
              <Link href="/about" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }} className="nav-link-dark">
                Editorial Team
              </Link>
              <Link href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }} className="nav-link-dark">
                Join Us
              </Link>
              <Link href="/privacy" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }} className="nav-link-dark">
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }} className="nav-link-dark">
                Terms of Use
              </Link>
              <Link href="/legal" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s ease' }} className="nav-link-dark">
                Legal Notice
              </Link>
            </div>
          </div>

          {/* Column 4: Embedded Stay in the Loop form */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: '#ffffff', letterSpacing: '-0.01em' }}>Stay in the loop</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.8125rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              Get new articles on astrophysics, AI, and science delivered straight to your inbox.
            </p>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" disabled aria-label="Email address" 
                placeholder="your@email.com" 
                style={{ 
                  padding: '0.625rem 1rem', 
                  borderRadius: '8px', 
                  border: '1px solid #334155', 
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  outline: 'none', 
                  fontSize: '0.8125rem',
                  width: '100%',
                  transition: 'border-color 0.2s ease'
                }} 
                required
              />
              <button type="submit" disabled className="btn-primary" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: '0.375rem',
                  fontSize: '0.8125rem',
                  height: '36px',
                  backgroundColor: 'var(--accent-blue)',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'background-color 0.2s ease'
                }}
              >
                Subscribe <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
            <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem' }}>Newsletter launching soon</p>
          </div>

        </div>

        {/* Footer bottom details */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderTop: '1px solid #1e293b', 
          paddingTop: '2rem', 
          fontSize: '0.875rem', 
          color: '#64748b',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p>© {currentYear} {name}. All rights reserved.</p>
          <p>Built with curiosity & coffee ☕</p>
        </div>
      </div>
    </footer>
  )
}
