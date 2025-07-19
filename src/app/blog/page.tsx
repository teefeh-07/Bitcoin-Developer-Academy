'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: Date
  readTime: string
  tags: string[]
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 'getting-started-clarity',
    title: 'Getting Started with Clarity: A Beginner\'s Guide to Bitcoin Smart Contracts',
    excerpt: 'Learn the fundamentals of Clarity, the smart contract language that brings programmability to Bitcoin through Stacks.',
    content: `Clarity is a decidable smart contract language that optimizes for predictability and security. Unlike other smart contract languages, Clarity is interpreted (not compiled) and the complete program is published on-chain.

## Why Clarity?

Clarity was designed with several key principles in mind:

- **Decidable**: You can know with certainty what a program will do
- **Interpreted**: No compilation step, source code is published on-chain
- **Non-Turing complete**: Prevents infinite loops and makes programs predictable
- **Secure by design**: Built-in protections against common vulnerabilities

## Your First Contract

Let's start with a simple example:

\`\`\`clarity
(define-public (hello-world)
  (ok "Hello, Bitcoin!"))
\`\`\`

This function creates a public endpoint that returns a success response with a greeting message.

## Next Steps

Ready to dive deeper? Check out our interactive tutorials to start building real smart contracts on the Stacks blockchain.`,
    author: 'Bitcoin Developer Academy',
    publishedAt: new Date('2024-01-15'),
    readTime: '5 min read',
    tags: ['clarity', 'smart-contracts', 'beginner'],
    featured: true
  },
  {
    id: 'stacks-ecosystem-overview',
    title: 'The Stacks Ecosystem: Building on Bitcoin\'s Foundation',
    excerpt: 'Explore the growing Stacks ecosystem and discover how developers are building innovative applications on Bitcoin.',
    content: `The Stacks ecosystem has grown tremendously, bringing smart contracts and decentralized applications to Bitcoin. Let's explore what makes this ecosystem unique and the opportunities it presents for developers.

## What is Stacks?

Stacks is a layer-1 blockchain that settles on Bitcoin, enabling smart contracts and decentralized applications while inheriting Bitcoin's security.

## Key Features

- **Bitcoin Settlement**: All Stacks transactions settle on Bitcoin
- **Proof of Transfer (PoX)**: Unique consensus mechanism that recycles Bitcoin
- **Smart Contracts**: Full programmability with Clarity language
- **Bitcoin Integration**: Native Bitcoin operations in smart contracts

## Popular Applications

The Stacks ecosystem includes:
- DeFi protocols like ALEX and Arkadiko
- NFT marketplaces and collections
- Developer tools and infrastructure
- Bitcoin-native applications

## Getting Involved

Whether you're a seasoned developer or just starting out, there are many ways to contribute to the Stacks ecosystem.`,
    author: 'Bitcoin Developer Academy',
    publishedAt: new Date('2024-01-10'),
    readTime: '7 min read',
    tags: ['stacks', 'bitcoin', 'ecosystem'],
    featured: true
  },
  {
    id: 'nft-development-guide',
    title: 'Building NFTs on Stacks: From Concept to Marketplace',
    excerpt: 'A comprehensive guide to creating, deploying, and trading NFTs on the Stacks blockchain using the SIP-009 standard.',
    content: `Non-Fungible Tokens (NFTs) on Stacks follow the SIP-009 standard, which provides a robust framework for creating unique digital assets secured by Bitcoin.

## Understanding SIP-009

The SIP-009 standard defines the interface for NFTs on Stacks:

\`\`\`clarity
(define-non-fungible-token my-nft uint)

(define-public (mint (recipient principal) (token-id uint))
  (nft-mint? my-nft token-id recipient))
\`\`\`

## Key Components

Every NFT contract should include:
- Token definition
- Minting functions
- Transfer capabilities
- Metadata handling
- Access controls

## Marketplace Integration

Learn how to integrate your NFTs with existing marketplaces and create your own trading platform.

## Best Practices

- Implement proper access controls
- Handle metadata efficiently
- Consider gas optimization
- Plan for upgradability

## Real-World Examples

Explore successful NFT projects on Stacks and learn from their implementations.`,
    author: 'Bitcoin Developer Academy',
    publishedAt: new Date('2024-01-05'),
    readTime: '10 min read',
    tags: ['nft', 'sip-009', 'marketplace'],
    featured: false
  }
]

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const allTags = ['all', ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))]

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesTag && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <section className="pt-16 pb-12 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Latest Insights & Tutorials
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Bitcoin Developer Blog
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest Bitcoin and Stacks development trends, tutorials,
              and insights from our community of experts.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-custom-purple">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-custom-purple rounded-lg shadow-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-bold">BDA</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{post.author}</div>
                          <div className="text-xs text-gray-500">{post.publishedAt.toLocaleDateString()}</div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="py-8 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedTag === tag
                      ? 'bg-primary text-white'
                      : 'bg-custom-purple text-gray-700 border border-gray-300 hover:bg-custom-purple/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-12 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-custom-purple rounded-lg shadow-md overflow-hidden border border-gray-300 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <span className="text-xs text-gray-400">{post.publishedAt.toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{post.tags.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary hover:text-primary-dark font-medium text-sm"
                      >
                        Read →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or selected tags.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
