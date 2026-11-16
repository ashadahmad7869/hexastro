import { siteConfig } from '@/config/site'

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', minHeight: '80vh' }}>
      {/* Page Header */}
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          Contact & Collaboration
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Have a question about a research log or want to collaborate on a computational project? Let&apos;s connect.
        </p>
      </header>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Contact details & Social Connect */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Connect With Us
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {siteConfig.socials.length > 0
                ? 'Find HexAstro across these spaces:'
                : 'Contact details are coming soon.'}
            </p>

            {/* Social Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {siteConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    textDecoration: 'none',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-light-blue)',
                    color: 'var(--accent-blue)',
                    fontSize: '0.875rem'
                  }}>
                    {social.iconKey}
                  </span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)',
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
            Send a Message
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '-0.75rem', marginBottom: '1.25rem' }}>
            The contact form isn&apos;t live yet.
          </p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <fieldset disabled style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                required
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                className="focus-ring"
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                className="focus-ring"
              />
            </div>

            <div>
              <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Question about an article"
                required
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                className="focus-ring"
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your detailed message here..."
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  resize: 'vertical',
                }}
                className="focus-ring"
              />
            </div>

            <button type="submit" className="btn-primary" style={{ height: '44px', width: '100%', marginTop: '0.5rem' }}>
              Send Message
            </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}
