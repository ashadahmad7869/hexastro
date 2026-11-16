"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/config/site'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1600&auto=format&fit=crop', // Deep space nebula
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop', // Blue/purple stellar network
  'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1600&auto=format&fit=crop', // Starry night sky
  'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=1600&auto=format&fit=crop'  // Cosmic dust glow
]

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section style={{
      position: 'relative',
      padding: '8rem 1rem',
      overflow: 'hidden',
      backgroundColor: '#0f172a', // Dark background slate matching footer
      minHeight: '450px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Background Images Overlay Carousel */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {HERO_IMAGES.map((src, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={src}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: isActive ? 0.65 : 0, // Reduced opacity keeps text extremely legible and subtle
                transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out', // Smooth slow cross-fade & zoom
                transform: isActive ? 'scale(1.02)' : 'scale(1.0)', // Cinematic subtle scale zoom
                zIndex: isActive ? 1 : 0
              }}
            >
              <Image
                src={src}
                alt="Cosmic space backdrop"
                fill
                priority={index === 0}
                style={{ objectFit: 'cover' }}
                sizes="100vw"
              />
            </div>
          )
        })}
        {/* Dark Radial Gradient mask overlay to blend edges */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.85) 100%)',
          zIndex: 2
        }} />
      </div>

      {/* Content wrapper */}
      <div style={{
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '850px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '3.75rem',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          letterSpacing: '-0.03em',
          color: '#ffffff'
        }}>
          Exploring the Universe <br />
          through <span className="text-gradient-blue">Science</span>, <span className="text-gradient-purple">Code</span>, <br />
          and <span className="text-gradient-teal">Curiosity</span>
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: '#e2e8f0',
          maxWidth: '620px',
          margin: '0 auto',
          lineHeight: 1.65
        }}>
          {siteConfig.description}
        </p>
      </div>
    </section>
  )
}
