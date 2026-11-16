// Card/sidebar cover for a post: the article's own `coverImage` (a local /images/... path)
// if set, otherwise a legacy per-slug placeholder, otherwise the default nebula.
const legacyCovers: Record<string, string> = {
  'first-post': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop',
  'inside-transformer': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
  'mapping-invisible-mass': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
  'scientific-computing-python': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop',
  'scaling-laws-llm': 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=800&auto=format&fit=crop',
  'riemann-hypothesis': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
}
const defaultCover = 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop'

export function getCoverImage(slug: string, coverImage?: string): string {
  if (coverImage && coverImage.startsWith('/images/')) return coverImage
  return legacyCovers[slug] ?? defaultCover
}
