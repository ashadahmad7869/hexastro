"use client"

export default function NewsletterForm() {
  return (
    <section style={{ padding: '4rem 0', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '600px' }}>
        <div style={{ backgroundColor: '#eff6ff', color: '#2563eb', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>Stay in the Loop</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Get new articles on astrophysics, AI, and scientific research delivered straight to your inbox. No spam, ever.</p>
        
        <form style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }} onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" disabled aria-label="Email address" 
            placeholder="your@email.com" 
            style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', width: '300px', fontSize: '1rem' }} 
            required
          />
          <button type="submit" disabled className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Subscribe <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </form>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Newsletter launching soon</p>
      </div>
    </section>
  )
}
