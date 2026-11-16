"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { newsHighlights } from '@/config/news'

export default function NewsHighlightsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-scrolling horizontal slider timer (cycles every 4 seconds)
  useEffect(() => {
    if (newsHighlights.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsHighlights.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', minHeight: '80vh' }}>
      {/* Page Header */}
      <header style={{ marginBottom: '4rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2.5rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.375rem', 
          color: 'var(--accent-blue)', 
          fontSize: '0.875rem', 
          fontWeight: 700, 
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.75rem' 
        }}>
          📢 News Feed
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
          News & highlights
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Stay updated with breaking discoveries, algorithmic breakthroughs, and updates from the scientific frontier.
        </p>
      </header>

      {/* 1. LATEST NEWS - Auto-scrolling Slider Section */}
      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Latest News
        </h2>
        
        {newsHighlights.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr', width: '100%', maxWidth: '850px', margin: '0 auto' }}>
            {/* Active Slide Card */}
            {newsHighlights.map((item, index) => {
              const isActive = index === currentSlide
              return (
                <div
                  key={item.id}
                  style={{
                    gridArea: '1 / 1 / 2 / 2',
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isActive ? 'translateX(0)' : 'translateX(20px)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '16px',
                    padding: '2rem',
                    backgroundColor: 'white',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
                    gap: '2rem',
                    flexWrap: 'wrap',
                    alignItems: 'start',
                    display: 'flex',
                    zIndex: isActive ? 2 : 1
                  }}
                >
                  {/* Slide Cover Image */}
                  <div style={{ 
                    position: 'relative', 
                    width: '240px', 
                    height: '160px', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    flexShrink: 0,
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)'
                  }}>
                    <Image 
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="240px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Slide Contents */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1, flexBasis: '320px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '9999px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        backgroundColor: 'var(--accent-light-blue)', 
                        color: 'var(--accent-blue)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {item.category}
                      </span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                        {item.date}
                      </span>
                    </div>

                    <Link href={`/news/highlights/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 
                        style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, lineHeight: 1.3, cursor: 'pointer' }}
                        className="news-title-link"
                      >
                        {item.title}
                      </h3>
                    </Link>

                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {item.excerpt}
                    </p>

                    <div style={{ marginTop: '0.5rem' }}>
                      <Link 
                        href={`/news/highlights/${item.id}`}
                        style={{
                          color: 'var(--accent-blue)',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          textDecoration: 'underline'
                        }}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Slider Navigation Indicator Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {newsHighlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: index === currentSlide ? 'var(--accent-blue)' : 'var(--border-color)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background-color 0.3s ease'
                  }}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. ALL NEWS - Grid list tiles section */}
      <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          All News Highlights
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {newsHighlights.length === 0 && (
            <p style={{ color: 'var(--text-secondary)' }}>No highlights yet. The first ones are on their way.</p>
          )}
          {newsHighlights.map((item) => (
            <div 
              key={item.id}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              className="btn-outline-card"
            >
              {/* Picture Cover */}
              <div style={{ position: 'relative', height: '160px', width: '100%', borderBottom: '1px solid var(--border-color)' }}>
                <Image 
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Tile Content details */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.date}
                  </span>
                </div>

                <Link href={`/news/highlights/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 
                    style={{ 
                      fontSize: '1rem', 
                      fontWeight: 800, 
                      margin: 0, 
                      lineHeight: 1.4,
                      cursor: 'pointer',
                    }}
                    className="news-title-link"
                  >
                    {item.title}
                  </h3>
                </Link>

                <Link 
                  href={`/news/highlights/${item.id}`}
                  style={{
                    alignSelf: 'start',
                    color: 'var(--accent-blue)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    textDecoration: 'underline',
                    marginTop: '0.5rem'
                  }}
                >
                  Read more &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
