"use client"

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/config/site'
import SearchBar from './SearchBar'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { logo, navigation } = siteConfig
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const pathname = usePathname()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isSearchFocused ? '1fr auto 1.5fr' : '1fr auto 1fr',
        alignItems: 'center',
        padding: '0.25rem 2rem',
        maxWidth: '1600px',
        margin: '0 auto',
        width: '100%',
        transition: 'grid-template-columns 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image 
            src={logo.src} 
            alt={logo.alt} 
            width={logo.width} 
            height={logo.height} 
            style={{ height: logo.displayHeight, width: 'auto' }} 
            priority 
          />
        </Link>

        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {navigation.main.map((link) => {
            // Check dynamic path matches for active highlights
            const isActive = link.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(link.href)

            if (link.name === 'Articles') {
              return (
                <div key={link.name} className="navbar-dropdown-wrapper">
                  <Link 
                    href={link.href} 
                    style={isActive ? { backgroundColor: 'var(--accent-light-blue)', color: 'var(--accent-blue)', padding: '0.375rem 0.75rem', borderRadius: '9999px', display: 'inline-block' } : { padding: '0.375rem 0.75rem', display: 'inline-block' }} 
                    className={isActive ? '' : 'hover:text-primary'}
                  >
                    {link.name}
                  </Link>
                  <div className="navbar-dropdown">
                    <Link href="/posts?type=guide" className="navbar-dropdown-link">
                      Guides
                    </Link>
                    <Link href="/posts?type=debrief" className="navbar-dropdown-link">
                      Research Papers
                    </Link>
                    <Link href="/posts?type=exploration" className="navbar-dropdown-link">
                      Essays
                    </Link>
                  </div>
                </div>
              )
            }

            return (
              <Link 
                key={link.name} 
                href={link.href} 
                style={isActive ? { backgroundColor: 'var(--accent-light-blue)', color: 'var(--accent-blue)', padding: '0.375rem 0.75rem', borderRadius: '9999px' } : { padding: '0.375rem 0.75rem' }} 
                className={isActive ? '' : 'hover:text-primary'}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', justifySelf: 'end' }}>
          <SearchBar isFocused={isSearchFocused} setIsFocused={setIsSearchFocused} />
          <Link href={navigation.actions.joinUs.href} className="btn-outline">
            {navigation.actions.joinUs.name}
          </Link>
          <Link href={navigation.actions.submit.href} className="btn-primary">
            {navigation.actions.submit.name}
          </Link>
        </div>
      </div>
    </header>
  )
}
