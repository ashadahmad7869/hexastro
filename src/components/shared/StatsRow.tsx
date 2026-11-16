import { siteConfig } from '@/config/site'

export default function StatsRow() {
  const { stats } = siteConfig

  return (
    <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '3rem 0', marginBottom: '6rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.articlesCount}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>Articles</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.topicsCount}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>Topics</div>
        </div>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.readersCount}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>Readers</div>
        </div>
      </div>
    </section>
  )
}
