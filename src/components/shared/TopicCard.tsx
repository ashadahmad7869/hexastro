import Link from 'next/link'

export interface TopicCardProps {
  title: string
  color: string // A light CSS color for the background, e.g. '#f5f3ff'
  iconColor: string // The color for the icon, e.g. '#8b5cf6'
  icon: React.ReactNode // SVG element
}

export default function TopicCard({ title, color, iconColor, icon }: TopicCardProps) {
  return (
    <Link href="/" style={{
      backgroundColor: color,
      padding: '2rem 1rem',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      transition: 'transform 0.2s ease',
      cursor: 'pointer'
    }}>
      <div style={{
        backgroundColor: 'white',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: iconColor,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}>
        {icon}
      </div>
      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
        {title}
      </span>
    </Link>
  )
}
