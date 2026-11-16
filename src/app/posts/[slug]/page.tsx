import Link from 'next/link'
import Image from 'next/image'
import { getCoverImage } from '@/lib/coverImage'
import { notFound } from 'next/navigation'
import { contentService } from '@/lib/services/contentService'
import MDXRenderer from '@/components/article/MDXRenderer'
import ReadingProgress from '@/components/layout/ReadingProgress'
import CopyLinkButton from '@/components/article/CopyLinkButton'
import ArticleNavigation from '@/components/article/ArticleNavigation'
import RelatedArticles from '@/components/article/RelatedArticles'
import AuthorBio from '@/components/article/AuthorBio'
import CitationBox from '@/components/article/CitationBox'
import PrerequisitesBox from '@/components/article/PrerequisitesBox'
import TableOfContents from '@/components/article/TableOfContents'
import PairedPostBox from '@/components/article/PairedPostBox'
import AIDisclosure from '@/components/article/AIDisclosure'

export const dynamicParams = false

export function generateStaticParams() {
  const articles = contentService.getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}


export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post;
  try {
    post = contentService.getArticleBySlug(params.slug)
  } catch {
    notFound()
  }

  const adjacent = contentService.getAdjacentArticles(params.slug)
  const related = contentService.getRelatedArticles(params.slug)

  // Fetch all articles to display related recommendations in the right sidebar
  const allArticles = contentService.getAllArticles()

  // Concept guide <-> paper debrief pairing (either side may declare relatedSlug)
  const paired = allArticles.find(p => p.slug !== post.slug && (p.slug === post.relatedSlug || p.relatedSlug === post.slug))

  // Select other educational guides (excluding current article)
  const otherGuides = allArticles
    .filter(p => p.contentType === 'guide' && p.slug !== post.slug)
    .slice(0, 2)

  // Select "Don't Miss" articles (excluding current article and guides)
  const dontMiss = allArticles
    .filter(p => p.slug !== post.slug && p.contentType !== 'guide')
    .slice(0, 2)

  // Ensure author is structured correctly as an Author object for the Bio box
  const authorObj = typeof post.author === 'string' 
    ? { id: 'unknown', name: post.author, avatar: '/authors/hexastro.svg' } 
    : post.author

  return (
    <>
      <ReadingProgress />
      
      <div className="article-layout">
        
        {/* Left Column: Table of Contents & Tags (Sticky on Desktop) */}
        <aside style={{
          position: 'sticky',
          top: '120px',
          maxHeight: 'calc(100vh - 160px)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          width: '220px',
          paddingRight: '1.5rem',
          borderRight: '1px solid var(--border-color)',
        }}
        className="left-sidebar"
        >
          {post.headings && post.headings.length > 0 && (
            <TableOfContents headings={post.headings} />
          )}

          {post.tags && post.tags.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.05em',
                color: 'var(--text-tertiary)',
                margin: 0
              }}>
                Tags
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/posts?search=${tag}`}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      padding: '0.375rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.15s ease'
                    }}
                    className="toc-tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Center Column: Centered Article Content Area */}
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <article>
            <header style={{ marginBottom: '3rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                gap: '1rem', 
                marginBottom: '1.5rem' 
              }}>
                <span style={{ 
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--accent-blue)',
                  backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  borderRadius: '9999px',
                }}>
                  {post.category || 'Transmission'}
                </span>
                <CopyLinkButton />
              </div>
              
              <h1 style={{ 
                fontSize: '2.75rem', 
                lineHeight: '1.2',
                letterSpacing: '-0.04em', 
                marginBottom: '1.25rem', 
                color: 'var(--text-primary)',
                fontWeight: 800
              }}>
                {post.title}
              </h1>
              
              {/* Replaced standard author/date/readTime metadata row with only Difficulty level */}
              <div style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.875rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
              }}>
                <span style={{ color: 'var(--text-tertiary)' }}>Difficulty:</span>
                <span style={{ 
                  fontWeight: 700, 
                  color: post.difficulty === 'Advanced' 
                    ? 'var(--accent-purple)' 
                    : post.difficulty === 'Beginner' 
                      ? 'var(--accent-teal)' 
                      : 'var(--accent-blue)',
                  backgroundColor: post.difficulty === 'Advanced' 
                    ? 'rgba(168, 85, 247, 0.1)' 
                    : post.difficulty === 'Beginner' 
                      ? 'rgba(16, 185, 129, 0.1)' 
                      : 'rgba(59, 130, 246, 0.1)',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {post.difficulty || 'Intermediate'}
                </span>
              </div>
            </header>

            {/* Dynamic Specialized Content Type Headers */}
            {post.contentType === 'debrief' && (
              <CitationBox 
                title={post.title}
                doi={post.doi}
                arxivId={post.arxivId}
                paperUrl={post.paperUrl}
                authors={post.paperAuthors}
                journal={post.journalName}
                year={post.publishYear}
              />
            )}

            {post.contentType === 'guide' && post.prerequisites && (
              <PrerequisitesBox prerequisites={post.prerequisites} />
            )}

            <div className="prose">
              <MDXRenderer source={post.content} />
            </div>
            <PairedPostBox current={post} paired={paired} />
            {post.coverImage && post.coverCredit && (
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '2rem' }}>
                Cover image:{' '}
                {post.coverSourceUrl ? (
                  <a href={post.coverSourceUrl} target="_blank" rel="noopener noreferrer">{post.coverCredit}</a>
                ) : post.coverCredit}
              </p>
            )}
            {post.aiDrafted && <AIDisclosure />}
          </article>
          
          <AuthorBio author={authorObj} />
          
          <ArticleNavigation previous={adjacent.previous} next={adjacent.next} />
          
          <RelatedArticles articles={related} />
        </div>

        {/* Right Column: Other Guides & Don't Miss Sidebar (Sticky on Desktop) */}
        <aside style={{
          position: 'sticky',
          top: '120px',
          maxHeight: 'calc(100vh - 160px)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '3rem',
          width: '280px',
          paddingLeft: '1.5rem',
          borderLeft: '1px solid var(--border-color)',
        }}
        className="right-sidebar"
        >
          {/* Other Guides Section */}
          {otherGuides.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: 'var(--accent-purple)',
                margin: 0
              }}>
                🎓 Other Guides
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {otherGuides.map(item => (
                  <Link 
                    key={item.slug} 
                    href={`/posts/${item.slug}`} 
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    className="sidebar-article-link"
                  >
                    <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <Image 
                        src={getCoverImage(item.slug, item.coverImage)} 
                        alt={item.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        sizes="280px"
                      />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Don't Miss Section */}
          {dontMiss.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h4 style={{
                fontWeight: 800,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                color: 'var(--accent-blue)',
                margin: 0
              }}>
                🔥 Don&apos;t Miss
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {dontMiss.map(item => (
                  <Link 
                    key={item.slug} 
                    href={`/posts/${item.slug}`} 
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    className="sidebar-article-link"
                  >
                    <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                      <Image 
                        src={getCoverImage(item.slug, item.coverImage)} 
                        alt={item.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        sizes="280px"
                      />
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

      </div>
    </>
  )
}
