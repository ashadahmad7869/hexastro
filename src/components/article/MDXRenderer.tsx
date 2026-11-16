import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import CustomCodeBlock from './CustomCodeBlock'
import Figure from './Figure'
import React, { ReactNode } from 'react'

interface MDXRendererProps {
  source: string
}

interface ReactElementWithChildren {
  props: {
    children?: ReactNode
  }
}

// Helper to extract plain text recursively from React nodes
const getText = (node: ReactNode): string => {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getText).join('')
  if (typeof node === 'object' && 'props' in node) {
    const el = node as ReactElementWithChildren
    if (el.props && el.props.children) {
      return getText(el.props.children)
    }
  }
  return ''
}

// Slugify helper to match the contentService heading parser
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-') // slugify spaces
}

const components = {
  Figure,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <CustomCodeBlock {...props} />,
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getText(children)
    const id = slugify(text)
    return <h2 id={id} {...props}>{children}</h2>
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = getText(children)
    const id = slugify(text)
    return <h3 id={id} {...props}>{children}</h3>
  }
}

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <MDXRemote 
      source={source} 
      components={components}
      options={{
        blockJS: true,
        blockDangerousJS: true,
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex, rehypeHighlight],
        }
      }}
    />
  )
}
