interface FigureProps {
  src: string        // local path under /images/..., e.g. /images/papers/2611.01234/fig3.webp
  alt: string        // what the image shows, for screen readers
  caption?: string   // explanatory caption, written for HexAstro readers
  credit: string     // e.g. "Smith et al. (2026), Fig. 3" or "NRAO/AUI/NSF"
  license: string    // e.g. "CC BY 4.0"
  licenseUrl?: string
  sourceUrl?: string // where the image came from (paper / image page)
}

// Article figure with mandatory credit + licence. Usable in MDX as <Figure ... />.
export default function Figure({ src, alt, caption, credit, license, licenseUrl, sourceUrl }: FigureProps) {
  return (
    <figure style={{ margin: '2rem 0' }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX figures have unknown intrinsic sizes */}
      <img src={src} alt={alt} loading="lazy" decoding="async"
        style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '1px solid var(--border-color)' }} />
      <figcaption style={{ marginTop: '0.625rem', fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
        {caption && <span>{caption} </span>}
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-tertiary, var(--text-secondary))' }}>
          Credit:{' '}
          {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{credit}</a> : credit}
          {' · '}
          {licenseUrl ? <a href={licenseUrl} target="_blank" rel="noopener noreferrer">{license}</a> : license}
        </span>
      </figcaption>
    </figure>
  )
}
