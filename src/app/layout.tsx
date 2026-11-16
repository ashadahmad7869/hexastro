import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github-dark.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'HexAstro | Science, Code & Curiosity',
  description: 'Discussing the cosmos, astrophysics literature, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
