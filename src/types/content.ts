export interface Author {
  id: string
  name: string
  avatar: string
  role?: string
  bio?: string
  socials?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface Heading {
  text: string
  id: string
  level: number
}

export type ContentType = 'news' | 'guide' | 'debrief' | 'exploration'

export interface Article {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  author: Author | string
  tags: string[]
  featured: boolean
  headings: Heading[]
  category?: string
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  updated?: string
  pinned?: boolean
  draft?: boolean
  contentType: ContentType
  prerequisites?: string[]
  codeLanguages?: string[]
  doi?: string
  arxivId?: string
  paperUrl?: string
  paperAuthors?: string[]
  journalName?: string
  publishYear?: number
}

export interface Tutorial {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: Author | string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
  category?: string
}

export interface Project {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: Author | string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface Resource {
  slug: string
  title: string
  excerpt: string
  url: string
  type: 'Book' | 'Paper' | 'Tool' | 'Dataset'
  tags: string[]
}

export interface Category {
  id: string
  name: string
  description?: string
}

export interface Tag {
  id: string
  name: string
}
