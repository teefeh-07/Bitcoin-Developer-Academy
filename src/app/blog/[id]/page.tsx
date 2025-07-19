'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

const blogPosts: { [key: string]: BlogPost } = {
  'getting-started-clarity': {
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

## Understanding the Syntax

Clarity uses a LISP-like syntax with prefix notation:
- Functions are called with \`(function-name arg1 arg2)\`
- Everything is wrapped in parentheses
- The function name comes first, followed by arguments

## Data Types

Clarity has several built-in data types:
- \`uint\` - unsigned integers (u1, u42, u1000)
- \`int\` - signed integers (1, -42, 1000)  
- \`bool\` - booleans (true, false)
- \`string-ascii\` - ASCII strings
- \`string-utf8\` - UTF-8 strings
- \`principal\` - Stacks addresses

## Working with Variables

Here's a simple counter contract:

\`\`\`clarity
(define-data-var counter uint u0)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

(define-read-only (get-counter)
  (var-get counter))
\`\`\`

## Next Steps

Ready to dive deeper? Check out our interactive tutorials to start building real smart contracts on the Stacks blockchain.

- [Hello Clarity Tutorial](/tutorials/hello-clarity)
- [Your First DApp](/tutorials/your-first-dapp)
- [NFTs on Stacks](/tutorials/nfts-on-stacks)`,
    author: 'Bitcoin Developer Academy',
    publishedAt: new Date('2024-01-15'),
    readTime: '5 min read',
    tags: ['clarity', 'smart-contracts', 'beginner'],
    featured: true
  },
  'stacks-ecosystem-overview': {
    id: 'stacks-ecosystem-overview',
    title: 'The Stacks Ecosystem: Building on Bitcoin\'s Foundation',
    excerpt: 'Explore the growing Stacks ecosystem and discover how developers are building innovative applications on Bitcoin.',
    content: `The Stacks ecosystem has grown tremendously, bringing smart contracts and decentralized applications to Bitcoin. Let's explore what makes this ecosystem unique and the opportunities it presents for developers.

## What is Stacks?

Stacks is a layer-1 blockchain that settles on Bitcoin, enabling smart contracts and decentralized applications while inheriting Bitcoin's security.

### Key Features

- **Bitcoin Settlement**: All Stacks transactions settle on Bitcoin
- **Proof of Transfer (PoX)**: Unique consensus mechanism that recycles Bitcoin
- **Smart Contracts**: Full programmability with Clarity language
- **Bitcoin Integration**: Native Bitcoin operations in smart contracts

## The Growing Ecosystem

### DeFi Protocols
- **ALEX**: Automated market maker and DeFi hub
- **Arkadiko**: Decentralized stablecoin protocol
- **StackSwap**: Decentralized exchange
- **Zest Protocol**: Bitcoin lending and borrowing

### NFT Marketplaces
- **Gamma**: Premier NFT marketplace
- **Byzantion**: Community-driven marketplace
- **StacksArt**: Digital art platform

### Developer Tools
- **Clarinet**: Smart contract development environment
- **Stacks.js**: JavaScript SDK for Stacks
- **Hiro Platform**: Developer tools and APIs
- **Chainhook**: Event-driven blockchain indexing

### Infrastructure
- **Stacks Explorer**: Blockchain explorer
- **Stacks API**: RESTful API for blockchain data
- **Gaia**: Decentralized storage system

## Building on Stacks

### Why Choose Stacks?

1. **Bitcoin Security**: Inherit Bitcoin's proven security model
2. **Smart Contract Capability**: Build complex applications with Clarity
3. **Growing Ecosystem**: Join a thriving community of builders
4. **Bitcoin Integration**: Access Bitcoin's liquidity and user base

### Getting Started

1. **Learn Clarity**: Start with our interactive tutorials
2. **Set up Development Environment**: Install Clarinet and Stacks CLI
3. **Build Your First DApp**: Create a simple application
4. **Deploy to Testnet**: Test your application safely
5. **Launch on Mainnet**: Go live with your project

## Success Stories

### Case Study: ALEX Protocol
ALEX has become one of the largest DeFi protocols on Stacks, offering:
- Automated market making
- Yield farming
- Lending and borrowing
- Cross-chain bridges

### Case Study: Gamma NFTs
Gamma has facilitated millions in NFT trading volume, featuring:
- User-friendly interface
- Creator tools
- Community features
- Bitcoin-native transactions

## Future Opportunities

The Stacks ecosystem continues to evolve with exciting developments:
- **sBTC**: Bringing Bitcoin to smart contracts
- **Subnets**: Scalable application-specific chains
- **Nakamoto Release**: Enhanced performance and capabilities

## Getting Involved

Whether you're a seasoned developer or just starting out, there are many ways to contribute:

1. **Build Applications**: Create the next breakthrough DApp
2. **Contribute to Open Source**: Help improve existing tools
3. **Join the Community**: Connect with other builders
4. **Share Knowledge**: Write tutorials and documentation

## Resources

- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language Reference](https://docs.stacks.co/clarity)
- [Developer Discord](https://discord.gg/stacks)
- [GitHub Repositories](https://github.com/stacks-network)

Ready to start building? Check out our comprehensive tutorials and join the growing community of Bitcoin developers!`,
    author: 'Bitcoin Developer Academy',
    publishedAt: new Date('2024-01-10'),
    readTime: '7 min read',
    tags: ['stacks', 'bitcoin', 'ecosystem'],
    featured: true
  },
  'nft-development-guide': {
    id: 'nft-development-guide',
    title: 'Building NFTs on Stacks: From Concept to Marketplace',
    excerpt: 'A comprehensive guide to creating, deploying, and trading NFTs on the Stacks blockchain using the SIP-009 standard.',
    content: `Non-Fungible Tokens (NFTs) on Stacks follow the SIP-009 standard, which provides a robust framework for creating unique digital assets secured by Bitcoin.

## Understanding SIP-009

The SIP-009 standard defines the interface for NFTs on Stacks. Here's a basic implementation:

\`\`\`clarity
(define-non-fungible-token my-nft uint)

(define-public (mint (recipient principal) (token-id uint))
  (nft-mint? my-nft token-id recipient))

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (nft-transfer? my-nft token-id sender recipient)))

(define-read-only (get-owner (token-id uint))
  (nft-get-owner? my-nft token-id))

(define-read-only (get-token-uri (token-id uint))
  (ok (some "https://example.com/metadata/{id}")))
\`\`\`

## Key Components

Every NFT contract should include:

### 1. Token Definition
\`\`\`clarity
(define-non-fungible-token my-nft uint)
\`\`\`

### 2. Minting Functions
\`\`\`clarity
(define-public (mint (recipient principal) (token-id uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u401))
    (nft-mint? my-nft token-id recipient)))
\`\`\`

### 3. Transfer Capabilities
\`\`\`clarity
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (nft-transfer? my-nft token-id sender recipient)))
\`\`\`

### 4. Metadata Handling
\`\`\`clarity
(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat base-uri (uint-to-ascii token-id)))))
\`\`\`

### 5. Access Controls
\`\`\`clarity
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))

(define-private (is-owner)
  (is-eq tx-sender contract-owner))
\`\`\`

## Advanced Features

### Royalties
\`\`\`clarity
(define-map royalties uint {
  recipient: principal,
  percentage: uint
})

(define-public (set-royalty (token-id uint) (recipient principal) (percentage uint))
  (begin
    (asserts! (is-owner) err-owner-only)
    (asserts! (<= percentage u1000) (err u400)) ;; Max 10%
    (map-set royalties token-id {recipient: recipient, percentage: percentage})
    (ok true)))
\`\`\`

### Batch Operations
\`\`\`clarity
(define-public (batch-mint (recipients (list 100 principal)))
  (begin
    (asserts! (is-owner) err-owner-only)
    (ok (map mint-to-recipient recipients))))

(define-private (mint-to-recipient (recipient principal))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (var-set last-token-id token-id)
    (nft-mint? my-nft token-id recipient)))
\`\`\`

## Marketplace Integration

### Listing for Sale
\`\`\`clarity
(define-map listings uint {
  seller: principal,
  price: uint,
  active: bool
})

(define-public (list-for-sale (token-id uint) (price uint))
  (begin
    (asserts! (is-eq (some tx-sender) (nft-get-owner? my-nft token-id)) (err u403))
    (map-set listings token-id {seller: tx-sender, price: price, active: true})
    (ok true)))
\`\`\`

### Purchase Function
\`\`\`clarity
(define-public (purchase (token-id uint))
  (let ((listing (unwrap! (map-get? listings token-id) (err u404))))
    (begin
      (asserts! (get active listing) (err u410))
      (try! (stx-transfer? (get price listing) tx-sender (get seller listing)))
      (try! (nft-transfer? my-nft token-id (get seller listing) tx-sender))
      (map-delete listings token-id)
      (ok true))))
\`\`\`

## Best Practices

### 1. Gas Optimization
- Use efficient data structures
- Minimize contract calls
- Batch operations when possible

### 2. Security Considerations
- Implement proper access controls
- Validate all inputs
- Use safe arithmetic operations

### 3. Metadata Standards
- Follow JSON metadata standards
- Use IPFS for decentralized storage
- Include proper image and attribute data

### 4. Testing
- Write comprehensive unit tests
- Test edge cases and error conditions
- Use Clarinet for local development

## Deployment Guide

### 1. Local Testing
\`\`\`bash
clarinet test
clarinet console
\`\`\`

### 2. Testnet Deployment
\`\`\`bash
clarinet deploy --testnet
\`\`\`

### 3. Mainnet Launch
\`\`\`bash
clarinet deploy --mainnet
\`\`\`

## Real-World Examples

### Successful NFT Projects on Stacks
- **Bitcoin Monkeys**: Early NFT collection
- **Stacks Punks**: Community-driven project
- **Megapont**: Generative art collection
- **Crashpunks**: Gaming-focused NFTs

## Next Steps

Ready to build your own NFT project? Here's what to do next:

1. **Complete our NFT tutorial**: [NFTs on Stacks Tutorial](/tutorials/nfts-on-stacks)
2. **Join the community**: Connect with other NFT creators
3. **Plan your project**: Define your collection and roadmap
4. **Build and test**: Develop your smart contract
5. **Launch**: Deploy to mainnet and start minting

The future of NFTs on Bitcoin is bright, and Stacks provides the perfect platform to bring your creative vision to life!`,
    author: 'Bitcoin Developer Academy',
    publishedAt: new Date('2024-01-05'),
    readTime: '10 min read',
    tags: ['nft', 'sip-009', 'marketplace'],
    featured: false
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const postData = blogPosts[postId]
    if (postData) {
      setPost(postData)
    }
    setIsLoading(false)
  }, [postId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-custom-purple flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-custom-purple flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The requested article could not be found.</p>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <div className="bg-custom-purple shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/blog"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">BDA</span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{post.author}</div>
                <div className="text-sm">{post.publishedAt.toLocaleDateString()}</div>
              </div>
            </div>
            <span className="text-sm">{post.readTime}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ className, children, ...props }: any) => {
                const isInline = !className?.includes('language-')
                if (isInline) {
                  return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>{children}</code>
                }
                return (
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code {...props}>{children}</code>
                  </pre>
                )
              },
              h2: ({ children, ...props }: any) => (
                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" {...props}>{children}</h2>
              ),
              h3: ({ children, ...props }: any) => (
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props}>{children}</h3>
              ),
              p: ({ children, ...props }: any) => (
                <p className="text-gray-700 leading-relaxed mb-4" {...props}>{children}</p>
              ),
              ul: ({ children, ...props }: any) => (
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props}>{children}</ul>
              ),
              ol: ({ children, ...props }: any) => (
                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props}>{children}</ol>
              ),
              a: ({ children, href, ...props }: any) => (
                <a href={href} className="text-primary hover:text-primary-dark underline" {...props}>{children}</a>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <Link href="/blog" className="btn-secondary">
              More Articles
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}
