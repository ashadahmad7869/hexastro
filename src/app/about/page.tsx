import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', minHeight: '80vh' }}>
      {/* Page Header */}
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          About HexAstro
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Bridging the gap between the cosmos and computational algorithms.
        </p>
      </header>

      {/* Two-Column Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left Column: Biography & Narrative */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              The Mission
            </h2>
            <p style={{ marginBottom: '1rem' }}>
              HexAstro was born out of a desire to explore the beautiful intersection of scientific discovery, mathematical modeling, and software engineering. We write for researchers, software engineers, data scientists, and anyone who looks at the night sky and wonders about the physics behind it, or looks at complex code and wonders about the math supporting it.
            </p>
            <p>
              From simulating relativistic shocks in astrophysical plasma to breaking down the mathematical foundations of transformer attention layers, our goals remain clear: build highly digestible, visual, and computationally sound analyses.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Core Themes
            </h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.25rem', margin: 0 }}>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Astrophysics & Cosmology</strong>: Exploring high-energy shock waves, dark matter mapping, stellar structures, and orbital kinetics.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Machine Learning & AI</strong>: Diving deep into neural network architectures, attention physics, transformer layers, and training mechanics.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Computational Mathematics</strong>: Resolving numerical integration, linear systems, equation sets, and matrix logic.
              </li>
            </ul>
          </section>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Link href="/posts" className="btn-primary">
              Browse Articles
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in Touch &rarr;
            </Link>
          </div>
        </div>

        {/* Right Column: Profile Card */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          padding: '2.5rem',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem'
        }}>
          {/* Profile Picture */}
          <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-blue)' }}>
            <Image 
              src="/authors/hexastro.svg"
              alt="HexAstro"
              fill
              sizes="120px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>
              HexAstro
            </h3>
            <span style={{ fontSize: '0.875rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
              Fundamentals, one paper at a time
            </span>
          </div>

          <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Run by a PhD researcher in high-energy astrophysics. Each day: one core concept explained from scratch, paired with a new arXiv paper that puts it to work.
          </p>

          {/* Research tags */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--accent-light-blue)', color: 'var(--accent-blue)' }}>#high-energy-astrophysics</span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--accent-light-blue)', color: 'var(--accent-blue)' }}>#arxiv</span>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: 'var(--accent-light-blue)', color: 'var(--accent-blue)' }}>#fundamentals</span>
          </div>
        </div>
      </div>
    </div>
  )
}
