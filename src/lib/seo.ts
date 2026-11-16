import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface PageSeoProps {
  title?: string
  description?: string
  slug?: string
  ogImage?: string
  noIndex?: boolean
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  slug = '',
  ogImage = '/logo/HexAstroLogoCropped.png', // Fallback to main logo
  noIndex = false,
}: PageSeoProps = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${siteConfig.name}` 
    : siteConfig.title

  const pageUrl = `${siteConfig.url}${slug.startsWith('/') ? slug : `/${slug}`}`

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    icons: {
      icon: '/favicon.ico',
    },
  }
}
