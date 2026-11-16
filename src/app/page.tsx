import Link from 'next/link'
import { contentService } from '@/lib/services/contentService'
import { siteConfig } from '@/config/site'
import ArticleCard from '@/components/article/ArticleCard'
import LatestPostsList from '@/components/article/LatestPostsList'
import { newsHighlights } from '@/config/news'
import Hero from '@/components/shared/Hero'

export default async function Home(props: { searchParams: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams
  const searchQuery = searchParams.search || ''

  const posts = contentService.getAllArticles()
  
  // Pick one featured post for each ContentType category, with fallbacks
  const featuredGuides = posts.filter(post => post.featured && post.contentType === 'guide')
  const featuredDebriefs = posts.filter(post => post.featured && post.contentType === 'debrief')
  const featuredExplorations = posts.filter(post => post.featured && post.contentType === 'exploration')

  const featuredPosts = [
    featuredGuides[0] || posts.find(p => p.contentType === 'guide'),
    featuredDebriefs[0] || posts.find(p => p.contentType === 'debrief'),
    featuredExplorations[0] || posts.find(p => p.contentType === 'exploration')
  ].filter((p): p is NonNullable<typeof p> => !!p)
  
  let latestPosts = posts
  if (searchQuery) {
    const queryLower = searchQuery.toLowerCase()
    latestPosts = posts.filter(post => 
      post.title.toLowerCase().includes(queryLower) ||
      post.excerpt.toLowerCase().includes(queryLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
      post.category?.toLowerCase().includes(queryLower)
    )
  }

  return (
    <div>
      {/* Dynamic Transitioning Space Background Hero Section */}
      <Hero />

      {/* News Highlights Preview Section */}
      <section style={{ padding: '4rem 0 4rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Latest Highlights</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Breaking news and announcements from the scientific frontier</p>
            </div>
            <Link href="/news/highlights" style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.875rem' }}>
              View all news &rarr;
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {newsHighlights.length === 0 && (
              <p style={{ color: 'var(--text-secondary)' }}>The first highlights are on their way.</p>
            )}
            {newsHighlights.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                className="btn-outline-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    color: 'var(--accent-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.date}
                  </span>
                </div>
                <Link href={`/news/highlights/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }} className="news-title-link">
                    {item.title}
                  </h3>
                </Link>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5, flexGrow: 1 }}>
                  {item.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Source: {item.source}
                  </span>
                  <Link href={`/news/highlights/${item.id}`} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-blue)', textDecoration: 'none' }}>
                    Read full &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles - Editor's Picks */}
      {featuredPosts.length > 0 && (
      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '5rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Featured Articles</h2>
              <p style={{ color: 'var(--text-secondary)' }}>{"Editor's picks — the best of HexAstro"}</p>
            </div>
            <Link href="/posts" style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.875rem' }}>
              View all featured &rarr;
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {featuredPosts.map((post) => (
               <ArticleCard 
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  tag={post.category || 'Article'}
                  date={post.date}
                  readTime={post.readTime}
                  author={post.author}
                  featured={false}
                  tags={post.tags}
                  contentType={post.contentType}
               />
            ))}
          </div>
        </div>
      </section>
      )}

      <div className="container" id="latest-posts" style={{ marginBottom: '5rem' }}>
        {/* Interactive Latest Posts (Client Component) */}
        <LatestPostsList latestPosts={latestPosts} topics={siteConfig.topics} searchQuery={searchQuery} />
      </div>
    </div>
  )
}
