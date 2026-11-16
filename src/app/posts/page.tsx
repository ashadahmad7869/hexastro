import { contentService } from '@/lib/services/contentService'
import { siteConfig } from '@/config/site'
import LatestPostsList from '@/components/article/LatestPostsList'

export default async function PostsPage(props: { searchParams: Promise<{ search?: string; type?: string }> }) {
  const searchParams = await props.searchParams
  const searchQuery = searchParams.search || ''
  const typeQuery = searchParams.type || ''
  const posts = contentService.getAllArticles()

  return (
    <div className="container" style={{ paddingTop: '4rem', minHeight: '80vh' }}>
      <LatestPostsList 
        latestPosts={posts} 
        topics={siteConfig.topics} 
        searchQuery={searchQuery} 
        typeQuery={typeQuery}
        isFullIndex={true}
      />
    </div>
  )
}
