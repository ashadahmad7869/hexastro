"use client"

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setProgress((window.scrollY / scrollHeight) * 100)
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: '80px', // matches our header box height
      left: 0,
      width: '100%',
      height: '3px',
      backgroundColor: 'transparent',
      zIndex: 49,
      pointerEvents: 'none'
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        backgroundColor: 'var(--accent-blue)',
        transition: 'width 0.1s ease-out'
      }} />
    </div>
  )
}
