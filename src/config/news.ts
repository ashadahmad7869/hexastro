export interface NewsHighlight {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  category: string
  source: string
  imageUrl: string
  draft?: boolean
}

const allNewsHighlights: NewsHighlight[] = [
  {
    id: 'trappist-1-atmosphere',
    title: 'NASA\'s James Webb Confirms Atmospheric Details on Trappist-1 Exoplanet',
    excerpt: 'Spectroscopic measurements verify the presence of carbon dioxide and water molecules in the exoplanet\'s atmosphere, suggesting habitable criteria.',
    content: 'Using the Near-Infrared Spectrograph (NIRSpec) instrument, astronomers analyzed Trappist-1c as it transited its host star. The resulting absorption spectra reveal clear peaks corresponding to carbon dioxide, with traces of carbon monoxide and water vapor. This marks the first time that we have achieved sufficient resolution to isolate isotopic ratios in a rocky exoplanet atmosphere, opening a new chapter in exobiology.',
    date: '2026-07-09',
    category: 'Astrophysics',
    source: 'NASA Spaceflight',
    draft: true, // placeholder - remove to publish
    imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'desi-largest-3d-map',
    title: 'DESI Collaboration Maps the Largest 3D Map of the Cosmic Web',
    excerpt: 'The Dark Energy Spectroscopic Instrument (DESI) completes its phase survey mapping over six million galaxies to test dark energy decay models.',
    content: 'The Dark Energy Spectroscopic Instrument has mapped the spatial coordinates of over six million galaxies spanning 11 billion years of cosmic history. By measuring baryon acoustic oscillations (BAO), researchers isolated cosmological distances with less than 1% margin of error. The early results display slight alignments with dynamic dark energy models rather than a static cosmological constant, which could reshape cosmological paradigms.',
    date: '2026-06-25',
    category: 'Cosmology',
    source: 'Berkeley Lab',
    draft: true, // placeholder - remove to publish
    imageUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'physics-ai-agent',
    title: 'DeepMind Releases New Neural Agent for Oblique MHD Simulation Acceleration',
    excerpt: 'A customized deep learning architecture speeds up relativistic shock fluid calculations by up to 1000x over traditional grid integrations.',
    content: 'A new neural solver leverages Fourier Neural Operators (FNO) to solve relativistic magnetohydrodynamic equations in microseconds. While traditional grid integrations in paper benchmarks like Summerlin & Baring (2012) require massive CPU clusters and hours of simulation, this AI agent yields high-fidelity fluid density estimations with 99.8% conservation accuracy instantly, unlocking real-time particle kinetics analysis.',
    date: '2026-06-18',
    category: 'AI & Physics',
    source: 'Nature Machine Intelligence',
    draft: true, // placeholder - remove to publish
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop'
  }
]

const showDrafts = process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === '1'

export const newsHighlights: NewsHighlight[] = allNewsHighlights.filter(item => showDrafts || !item.draft)
