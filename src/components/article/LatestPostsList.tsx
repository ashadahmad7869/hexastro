"use client"

import { useState } from 'react'
import ArticleCard from './ArticleCard'
import { Article } from '@/types/content'

interface Topic {
  name: string
  color: string
}

interface LatestPostsListProps {
  latestPosts: Article[]
  topics: Topic[]
  searchQuery?: string
  typeQuery?: string
  isFullIndex?: boolean
}

export default function LatestPostsList({ 
  latestPosts, 
  topics, 
  searchQuery = '',
  typeQuery = '',
  isFullIndex = false 
}: LatestPostsListProps) {
  const getInitialTopic = () => {
    if (typeQuery === 'guide') return 'Guides'
    if (typeQuery === 'debrief') return 'Research Papers'
    if (typeQuery === 'exploration') return 'Essays'
    return 'All'
  }

  const [activeTopic, setActiveTopic] = useState<string>(getInitialTopic())
  const [localSearch, setLocalSearch] = useState(searchQuery)
  const [prevTypeQuery, setPrevTypeQuery] = useState(typeQuery)
  const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery)

  // Sync state with props during render if parameters changed (Standard React Pattern)
  if (typeQuery !== prevTypeQuery) {
    setPrevTypeQuery(typeQuery)
    if (typeQuery === 'guide') {
      setActiveTopic('Guides')
    } else if (typeQuery === 'debrief') {
      setActiveTopic('Research Papers')
    } else if (typeQuery === 'exploration') {
      setActiveTopic('Essays')
    } else {
      setActiveTopic('All')
    }
  }

  if (searchQuery !== prevSearchQuery) {
    setPrevSearchQuery(searchQuery)
    setLocalSearch(searchQuery)
  }

  // 1. Filter by search input query
  const searchFilteredPosts = latestPosts.filter(post => {
    const queryLower = localSearch.toLowerCase()
    if (!queryLower) return true
    
    return (
      post.title.toLowerCase().includes(queryLower) ||
      post.excerpt.toLowerCase().includes(queryLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(queryLower)) ||
      post.category?.toLowerCase().includes(queryLower) ||
      post.contentType.toLowerCase().includes(queryLower)
    )
  })

  // 2. Filter by active category badge selection
  const filteredPosts = activeTopic === 'All'
    ? searchFilteredPosts
    : searchFilteredPosts.filter(post => {
        if (isFullIndex) {
          // Filter by Content Type (Guide / Research Paper / Essay) on Articles index page
          if (activeTopic === 'Guides') return post.contentType === 'guide'
          if (activeTopic === 'Research Papers') return post.contentType === 'debrief'
          if (activeTopic === 'Essays') return post.contentType === 'exploration'
          return true
        } else {
          // Filter by Category Topic on Homepage
          return (
            post.category?.toLowerCase() === activeTopic.toLowerCase() ||
            post.tags.some(tag => tag.toLowerCase() === activeTopic.toLowerCase())
          )
        }
      })

  // 2b. Calculate the total number of posts under the active topic/tag (ignoring active search text)
  const topicTotalPosts = activeTopic === 'All'
    ? latestPosts
    : latestPosts.filter(post => {
        if (isFullIndex) {
          if (activeTopic === 'Guides') return post.contentType === 'guide'
          if (activeTopic === 'Research Papers') return post.contentType === 'debrief'
          if (activeTopic === 'Essays') return post.contentType === 'exploration'
          return true
        } else {
          return (
            post.category?.toLowerCase() === activeTopic.toLowerCase() ||
            post.tags.some(tag => tag.toLowerCase() === activeTopic.toLowerCase())
          )
        }
      })
  const totalCount = topicTotalPosts.length

  // 3. Extract featured post for the articles index page (hidden if search query or filters are active)
  const isSearchOrFilterActive = localSearch.trim().length > 0 || activeTopic !== 'All'
  const featuredPost = (isFullIndex && !isSearchOrFilterActive) 
    ? (filteredPosts.find(p => p.featured) || null) 
    : null
  const gridPosts = filteredPosts

  return (
    <section style={{ marginBottom: '6rem' }}>
      
      {/* Dynamic Articles Top Header (rendered on the Articles route page only) */}
      {isFullIndex && (
        <div style={{ marginBottom: '3.5rem' }}>

          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 800, 
            color: 'var(--text-primary)', 
            marginBottom: '0.75rem', 
            letterSpacing: '-0.03em' 
          }}>
            Articles
          </h1>

          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.125rem', 
            maxWidth: '650px', 
            lineHeight: 1.5,
            marginBottom: '2rem' 
          }}>
            Deep dives into astrophysics, AI, mathematics, and scientific research — written for curious minds.
          </p>

          {/* Inline Content Search Bar */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '420px', marginBottom: '2.5rem' }}>
            <input 
              type="text"
              placeholder="Search articles, topics, tags..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                width: '100%',
                height: '42px',
                padding: '0 1rem 0 2.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'white',
                color: 'var(--text-primary)',
                fontSize: '0.9375rem',
                outline: 'none',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              className="focus-ring"
            />
            <div style={{
              position: 'absolute',
              left: '0.875rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Homepage Top Header (rendered on the home page view only) */}
      {!isFullIndex && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Latest Posts
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>Fresh writing from the lab</p>
          </div>
        </div>
      )}

      {/* Filter Badges Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {/* Settings Filter Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem',
          color: 'var(--text-secondary)',
          marginRight: '0.5rem'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </div>

        <button
          onClick={() => {
            setActiveTopic('All')
          }}
          style={{
            backgroundColor: activeTopic === 'All' ? 'var(--accent-blue)' : 'transparent',
            color: activeTopic === 'All' ? 'white' : 'var(--text-secondary)',
            border: activeTopic === 'All' ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
            padding: '0.5rem 1.25rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          className={activeTopic === 'All' ? '' : 'toc-tag'}
        >
          All
        </button>

        {isFullIndex ? (
          // Content Type layout pills for the full Articles page hub
          ['Guides', 'Research Papers', 'Essays'].map(type => {
            const isActive = activeTopic === type
            return (
              <button
                key={type}
                onClick={() => {
                  setActiveTopic(type)
                }}
                style={{
                  backgroundColor: isActive ? 'var(--accent-blue)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className={isActive ? '' : 'toc-tag'}
              >
                {type}
              </button>
            )
          })
        ) : (
          // Topic category filters for the homepage latest view
          topics.map(topic => {
            const isActive = activeTopic.toLowerCase() === topic.name.toLowerCase()
            return (
              <button
                key={topic.name}
                onClick={() => {
                  setActiveTopic(topic.name)
                }}
                style={{
                  backgroundColor: isActive ? 'var(--accent-blue)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-color)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                className={isActive ? '' : 'toc-tag'}
              >
                {topic.name}
              </button>
            )
          })
        )}
      </div>

      {/* FEATURED Header & Card (only rendered on articles page if a featured post is present) */}
      {featuredPost && (
        <div style={{ marginBottom: '4rem' }}>
          <h4 style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            letterSpacing: '0.08em', 
            color: 'var(--accent-blue)', 
            textTransform: 'uppercase',
            marginBottom: '1rem',
            marginTop: 0
          }}>
            Featured
          </h4>
          <ArticleCard 
            slug={featuredPost.slug}
            title={featuredPost.title}
            excerpt={featuredPost.excerpt}
            tag={featuredPost.category || 'Article'}
            date={featuredPost.date}
            readTime={featuredPost.readTime}
            author={featuredPost.author}
            coverImage={featuredPost.coverImage}
            featured={true}
            tags={featuredPost.tags}
            contentType={featuredPost.contentType}
          />
        </div>
      )}

      {isFullIndex && (
        <div style={{ 
          fontSize: '0.875rem', 
          color: 'var(--text-secondary)', 
          fontWeight: 600, 
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          Showing {filteredPosts.length} of {totalCount} posts
        </div>
      )}

      {/* Dynamic Grid list */}
      {gridPosts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {gridPosts.map((post) => (
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
              tags={post.tags}
              contentType={post.contentType}
            />
          ))}
        </div>
      ) : (
        <div style={{
          padding: '5rem 2rem',
          textAlign: 'center',
          border: '1px dashed var(--border-color)',
          borderRadius: '12px',
          color: 'var(--text-secondary)'
        }}>
          <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500 }}>
            No transmissions registered under &quot;{activeTopic}&quot; yet.
          </p>
        </div>
      )}
    </section>
  )
}
