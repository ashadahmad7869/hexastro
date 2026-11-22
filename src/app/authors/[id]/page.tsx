import Image from 'next/image'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { authorsRegistry, contentService } from '@/lib/services/contentService'
import ArticleCard from '@/components/article/ArticleCard'
import SocialLinks from '@/components/article/SocialLinks'
import type { Article } from '@/types/content'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(authorsRegistry).map((id) => ({ id }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await props.params
  const author = authorsRegistry[id]
  if (!author) return {}
  return { title: `${author.name} | HexAstro`, description: author.bio }
}

const authorId = (a: Article['author']) => (typeof a === 'string' ? a : a.id)

export default async function AuthorPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const author = authorsRegistry[id]
  if (!author) notFound()

  const all = contentService.getAllArticles()
  const written = all.filter((p) => authorId(p.author) === id)
  const reviewed = all.filter((p) => p.reviewer?.id === id && authorId(p.author) !== id)

  const section = (heading: string, posts: Article[]) =>
    posts.length > 0 && (
      <section style={{ marginTop: '3.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          {heading} <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>({posts.length})</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
          {posts.map((post) => (
            <ArticleCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              tag={post.category || 'Article'}
              date={post.date}
              readTime={post.readTime}
              author={post.author}
              coverImage={post.coverImage}
              featured={false}
              tags={post.tags}
              contentType={post.contentType}
            />
          ))}
        </div>
      </section>
    )

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', minHeight: '80vh' }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '140px', height: '140px', flexShrink: 0 }}>
          <Image src={author.avatar} alt={author.name} fill sizes="140px" priority style={{ borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            {author.name}
          </h1>
          {author.role && (
            <p style={{ color: 'var(--accent-blue)', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{author.role}</p>
          )}
          {author.bio && (
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', lineHeight: 1.7, margin: '1rem 0 0 0', maxWidth: '680px' }}>
              {author.bio}
            </p>
          )}
          <SocialLinks socials={author.socials} size="md" />
        </div>
      </header>

      {section('Articles', written)}
      {section('Reviewed and edited', reviewed)}
    </div>
  )
}
