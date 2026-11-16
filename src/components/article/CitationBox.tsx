interface CitationBoxProps {
  title: string
  authors?: string[]
  journal?: string
  year?: number
  doi?: string
  arxivId?: string
  paperUrl?: string
}

export default function CitationBox({
  title,
  authors = [],
  journal,
  year,
  doi,
  arxivId,
  paperUrl
}: CitationBoxProps) {
  return (
    <div style={{
      border: '1px solid var(--border-color)',
      borderLeft: '4px solid var(--accent-blue)',
      borderRadius: '8px 12px 12px 8px',
      padding: '1.75rem',
      backgroundColor: 'var(--bg-secondary)',
      marginBottom: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.01)'
    }}>
      <div style={{ 
        fontSize: '0.75rem', 
        fontWeight: 800, 
        color: 'var(--accent-blue)', 
        textTransform: 'uppercase', 
        letterSpacing: '0.08em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        margin: 0
      }}>
        <span>📄</span> Published Research Summary
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h4 style={{ 
          fontSize: '1.1rem', 
          fontWeight: 700, 
          color: 'var(--text-primary)', 
          margin: 0,
          lineHeight: 1.4
        }}>
          {title}
        </h4>
        
        {authors.length > 0 && (
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>Authors:</strong> {authors.join(', ')}
          </div>
        )}

        {(journal || year) && (
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <strong>Journal:</strong> {journal} {year ? `(${year})` : ''}
          </div>
        )}
      </div>

      {/* Outbound Link Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '0.75rem', 
        flexWrap: 'wrap', 
        borderTop: '1px solid var(--border-color)', 
        paddingTop: '1rem',
        marginTop: '0.25rem' 
      }}>
        {paperUrl && (
          <a 
            href={paperUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.5rem 0.875rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="toc-link"
          >
            <span>🔗</span> View Publisher
          </a>
        )}

        {doi && (
          <a 
            href={`https://doi.org/${doi}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.5rem 0.875rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="toc-link"
          >
            <span>🏷️</span> DOI: {doi.length > 20 ? `${doi.substring(0, 18)}...` : doi}
          </a>
        )}

        {arxivId && (
          <a 
            href={`https://arxiv.org/abs/${arxivId}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '0.5rem 0.875rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            className="toc-link"
          >
            <span>📄</span> arXiv: {arxivId}
          </a>
        )}
      </div>
    </div>
  )
}
