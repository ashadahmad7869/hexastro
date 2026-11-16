import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Article, Author, Heading } from '@/types/content'

// Reusable mock authors registry to map string IDs from frontmatter
// Drafts are visible in `npm run dev`, hidden in production builds (set SHOW_DRAFTS=1 to override)
const showDrafts = process.env.NODE_ENV !== 'production' || process.env.SHOW_DRAFTS === '1'

const DEFAULT_AVATAR = '/authors/hexastro.svg'

export const authorsRegistry: Record<string, Author> = {
  hexastro: {
    id: 'hexastro',
    name: 'HexAstro',
    avatar: DEFAULT_AVATAR,
    role: 'Editor',
    bio: 'HexAstro explains the fundamentals of astrophysics and pairs each one with a fresh paper from arXiv.',
  },
  'alex-morgan': {
    id: 'alex-morgan',
    name: 'Dr. Alex Morgan',
    avatar: 'https://i.pravatar.cc/100?img=11',
    role: 'Lead Researcher & Publisher',
    bio: 'Alex is an astrophysicist specializing in cosmological simulations and machine learning applications in astrophysics.',
  }
}

export interface AdjacentArticles {
  previous: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

export interface IContentService {
  getAllArticles(): Article[]
  getArticleBySlug(slug: string): Article
  getFeaturedArticles(): Article[]
  getPinnedArticles(): Article[]
  getAdjacentArticles(currentSlug: string): AdjacentArticles
  getRelatedArticles(currentSlug: string, maxCount?: number): Article[]
}

export class LocalContentService implements IContentService {
  private articlesDirectory = path.join(process.cwd(), 'content/articles')

  private getAuthor(authorId?: string): Author {
    const defaultAuthor = authorsRegistry['hexastro']
    if (!authorId) return defaultAuthor
    return authorsRegistry[authorId] || {
      id: authorId,
      name: authorId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      avatar: DEFAULT_AVATAR,
    }
  }

  private calculateReadTime(content: string): string {
    const wordCount = content.split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(wordCount / 200))
    return `${minutes} min read`
  }

  private extractHeadings(content: string): Heading[] {
    // Regex matches lines starting with ## or ###
    const headingRegex = /^(##|###)\s+(.*)$/gm
    const headings: Heading[] = []
    let match
    
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length // 2 for h2, 3 for h3
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // remove special characters
        .trim()
        .replace(/\s+/g, '-') // slugify spaces
      
      headings.push({ text, id, level })
    }
    
    return headings
  }

  getAllArticles(): Article[] {
    if (!fs.existsSync(this.articlesDirectory)) {
      return []
    }

    const files = fs.readdirSync(this.articlesDirectory)
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))

    const articles = mdxFiles
      .map(file => this.readArticle(file.replace(/\.mdx$/, '')))
      .filter(article => showDrafts || !article.draft)

    // Sort by date descending
    return articles.sort((a, b) => (a.date > b.date ? -1 : 1))
  }

  getArticleBySlug(slug: string): Article {
    const article = this.readArticle(slug)
    if (article.draft && !showDrafts) {
      throw new Error(`Article with slug "${slug}" is a draft`)
    }
    return article
  }

  private readArticle(slug: string): Article {
    if (!/^[a-z0-9][a-z0-9-]*$/i.test(slug)) {
      throw new Error(`Invalid article slug "${slug}"`)
    }
    const fullPath = path.join(this.articlesDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Article with slug "${slug}" not found at path ${fullPath}`)
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const author = this.getAuthor(data.author)
    const headings = this.extractHeadings(content)
    const readTime = data.readTime || this.calculateReadTime(content)

    const rawDifficulty = data.difficulty || 'Intermediate'
    let difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate'
    if (rawDifficulty === 'Beginner' || rawDifficulty === 'Advanced') {
      difficulty = rawDifficulty
    }

    const updated = data.updated || data.date || ''
    const pinned = data.pinned === true

    return {
      slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      content,
      date: data.date || '',
      readTime: readTime,
      author,
      tags: data.tags || [],
      featured: data.featured === true,
      headings,
      category: data.category || (data.tags && data.tags.length > 0 ? data.tags[0] : 'General'),
      difficulty,
      updated,
      pinned,
      draft: data.draft === true,
      contentType: data.contentType || 'exploration',
      prerequisites: data.prerequisites,
      codeLanguages: data.codeLanguages,
      doi: data.doi,
      arxivId: data.arxivId,
      paperUrl: data.paperUrl,
      paperAuthors: data.paperAuthors,
      journalName: data.journalName,
      publishYear: data.publishYear ? Number(data.publishYear) : undefined
    }
  }

  getFeaturedArticles(): Article[] {
    const articles = this.getAllArticles()
    return articles.filter(article => article.featured)
  }

  getPinnedArticles(): Article[] {
    const articles = this.getAllArticles()
    return articles.filter(article => article.pinned)
  }

  getAdjacentArticles(currentSlug: string): AdjacentArticles {
    const articles = this.getAllArticles()
    const currentIndex = articles.findIndex(a => a.slug === currentSlug)

    if (currentIndex === -1) {
      return { previous: null, next: null }
    }

    // Array is sorted desc (newest first)
    // "Previous" (older) is at index + 1
    // "Next" (newer) is at index - 1
    const previous = currentIndex < articles.length - 1
      ? { slug: articles[currentIndex + 1].slug, title: articles[currentIndex + 1].title }
      : null

    const next = currentIndex > 0
      ? { slug: articles[currentIndex - 1].slug, title: articles[currentIndex - 1].title }
      : null

    return { previous, next }
  }

  getRelatedArticles(currentSlug: string, maxCount = 2): Article[] {
    const articles = this.getAllArticles()
    const currentArticle = articles.find(a => a.slug === currentSlug)

    if (!currentArticle) {
      return []
    }

    const scored = articles
      .filter(a => a.slug !== currentSlug)
      .map(a => {
        let score = 0
        if (a.category === currentArticle.category) score += 5
        
        const commonTags = a.tags.filter(t => currentArticle.tags.includes(t))
        score += commonTags.length * 2
        
        return { article: a, score }
      })
      .sort((a, b) => b.score - a.score)

    return scored.slice(0, maxCount).map(s => s.article)
  }
}

// Export a single instance to be used throughout the app
export const contentService: IContentService = new LocalContentService()
