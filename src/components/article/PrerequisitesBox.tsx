interface PrerequisitesBoxProps {
  prerequisites: string[]
}

export default function PrerequisitesBox({ prerequisites = [] }: PrerequisitesBoxProps) {
  if (prerequisites.length === 0) return null

  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderLeft: '4px solid var(--accent-purple)',
      borderRadius: '8px 12px 12px 8px',
      padding: '1.5rem 1.75rem',
      backgroundColor: 'var(--bg-secondary)',
      marginBottom: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.01)'
    }}>
      <div style={{ 
        fontSize: '0.75rem', 
        fontWeight: 800, 
        color: 'var(--accent-purple)', 
        textTransform: 'uppercase', 
        letterSpacing: '0.08em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        margin: 0
      }}>
        <span>🎓</span> Prerequisites & Required Stack
      </div>

      <ul style={{ 
        margin: 0, 
        paddingLeft: '1.25rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.375rem',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5
      }}>
        {prerequisites.map((item, index) => (
          <li key={index} style={{ listStyleType: 'square' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
