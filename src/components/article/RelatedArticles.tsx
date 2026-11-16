import ArticleCard from './ArticleCard'
import { Article } from '@/types/content'

interface RelatedArticlesProps {
  articles: Article[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section style={{
      marginTop: '5rem',
      paddingTop: '3rem',
      borderTop: '1px solid var(--border-color)',
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>
        Related Transmissions
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
            tag={article.category || 'Article'}
            date={article.date}
            readTime={article.readTime}
            author={article.author}
          />
        ))}
      </div>
    </section>
  )
}
