export const siteConfig = {
  name: 'HexAstro',
  title: 'HexAstro | Science, Code & Curiosity',
  description: 'A collaborative research and educational platform exploring the frontiers of astrophysics, machine learning, mathematics, and the software driving modern discovery.',
  tagline: 'Science • Code • Curiosity',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hexastro.vercel.app',
  logo: {
    src: '/logo/HexAstroLogoCropped.png',
    alt: 'HexAstro Logo',
    width: 600,
    height: 200,
    displayHeight: '72px',
    footerDisplayHeight: '48px',
  },
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'News', href: '/news/highlights' },
      { name: 'Articles', href: '/posts' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    actions: {
      joinUs: { name: 'Join Us', href: '/' },
      submit: { name: 'Submit Article', href: '/' },
    }
  },
  socials: [
    // Add real profiles here, e.g. { name: 'GitHub', href: 'https://github.com/<you>', iconKey: 'G' }
  ] as { name: string; href: string; iconKey: string }[],
  stats: {
    articlesCount: '9+',
    topicsCount: '5',
    readersCount: '2.4k',
  },
  topics: [
    { name: 'Astrophysics', href: '/', color: '#f5f3ff', iconColor: '#a855f7' },
    { name: 'AI', href: '/', color: '#eff6ff', iconColor: '#3b82f6' },
    { name: 'Programming', href: '/', color: '#f0fdf4', iconColor: '#22c55e' },
    { name: 'Mathematics', href: '/', color: '#fff7ed', iconColor: '#f97316' },
    { name: 'Research', href: '/', color: '#fef2f2', iconColor: '#ef4444' },
  ],
}

export type SiteConfig = typeof siteConfig
