'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DocSection {
  id: string
  title: string
  description: string
  icon: string
  articles: DocArticle[]
}

interface DocArticle {
  id: string
  title: string
  description: string
  readTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  tags: string[]
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Everything you need to begin your Bitcoin development journey',
    icon: '🚀',
    articles: [
      {
        id: 'introduction',
        title: 'Introduction to Bitcoin Development',
        description: 'Learn the fundamentals of Bitcoin and how Stacks enables smart contracts',
        readTime: '10 min',
        difficulty: 'Beginner',
        tags: ['bitcoin', 'stacks', 'overview']
      },
      {
        id: 'setup-environment',
        title: 'Setting Up Your Development Environment',
        description: 'Install and configure all the tools you need to start building',
        readTime: '15 min',
        difficulty: 'Beginner',
        tags: ['setup', 'tools', 'clarinet']
      },
      {
        id: 'first-contract',
        title: 'Your First Smart Contract',
        description: 'Write, test, and deploy your first Clarity smart contract',
        readTime: '20 min',
        difficulty: 'Beginner',
        tags: ['clarity', 'smart-contracts', 'tutorial']
      }
    ]
  },
  {
    id: 'clarity-language',
    title: 'Clarity Language',
    description: 'Complete reference for the Clarity smart contract language',
    icon: '📝',
    articles: [
      {
        id: 'clarity-syntax',
        title: 'Clarity Syntax and Structure',
        description: 'Learn the LISP-like syntax and basic structure of Clarity',
        readTime: '12 min',
        difficulty: 'Beginner',
        tags: ['clarity', 'syntax', 'basics']
      },
      {
        id: 'data-types',
        title: 'Data Types and Variables',
        description: 'Understanding Clarity\'s type system and variable declarations',
        readTime: '15 min',
        difficulty: 'Intermediate',
        tags: ['clarity', 'types', 'variables']
      },
      {
        id: 'functions-control',
        title: 'Functions and Control Flow',
        description: 'Define functions, handle conditionals, and control program flow',
        readTime: '18 min',
        difficulty: 'Intermediate',
        tags: ['clarity', 'functions', 'control-flow']
      },
      {
        id: 'advanced-patterns',
        title: 'Advanced Clarity Patterns',
        description: 'Learn advanced patterns for building complex smart contracts',
        readTime: '25 min',
        difficulty: 'Advanced',
        tags: ['clarity', 'patterns', 'advanced']
      }
    ]
  },
  {
    id: 'smart-contracts',
    title: 'Smart Contracts',
    description: 'Build and deploy smart contracts on Stacks',
    icon: '⚡',
    articles: [
      {
        id: 'contract-architecture',
        title: 'Smart Contract Architecture',
        description: 'Design patterns and best practices for contract structure',
        readTime: '20 min',
        difficulty: 'Intermediate',
        tags: ['architecture', 'design', 'best-practices']
      },
      {
        id: 'testing-contracts',
        title: 'Testing Smart Contracts',
        description: 'Write comprehensive tests for your Clarity contracts',
        readTime: '22 min',
        difficulty: 'Intermediate',
        tags: ['testing', 'clarinet', 'quality']
      },
      {
        id: 'deployment-guide',
        title: 'Deployment Guide',
        description: 'Deploy your contracts to testnet and mainnet',
        readTime: '15 min',
        difficulty: 'Intermediate',
        tags: ['deployment', 'testnet', 'mainnet']
      },
      {
        id: 'security-best-practices',
        title: 'Security Best Practices',
        description: 'Secure your smart contracts against common vulnerabilities',
        readTime: '30 min',
        difficulty: 'Advanced',
        tags: ['security', 'vulnerabilities', 'best-practices']
      }
    ]
  },
  {
    id: 'frontend-integration',
    title: 'Frontend Integration',
    description: 'Connect your dApps to the Stacks blockchain',
    icon: '🌐',
    articles: [
      {
        id: 'stacks-js-intro',
        title: 'Introduction to Stacks.js',
        description: 'Get started with the Stacks JavaScript SDK',
        readTime: '15 min',
        difficulty: 'Beginner',
        tags: ['stacks.js', 'sdk', 'javascript']
      },
      {
        id: 'wallet-integration',
        title: 'Wallet Integration',
        description: 'Connect to Stacks wallets and handle user authentication',
        readTime: '18 min',
        difficulty: 'Intermediate',
        tags: ['wallet', 'authentication', 'connect']
      },
      {
        id: 'contract-calls',
        title: 'Making Contract Calls',
        description: 'Read from and write to smart contracts from your frontend',
        readTime: '20 min',
        difficulty: 'Intermediate',
        tags: ['contract-calls', 'transactions', 'frontend']
      },
      {
        id: 'react-integration',
        title: 'React Integration',
        description: 'Build React applications with Stacks integration',
        readTime: '25 min',
        difficulty: 'Intermediate',
        tags: ['react', 'hooks', 'components']
      }
    ]
  },
  {
    id: 'nfts-tokens',
    title: 'NFTs & Tokens',
    description: 'Create and manage digital assets on Stacks',
    icon: '🎨',
    articles: [
      {
        id: 'sip-009-nfts',
        title: 'SIP-009 NFT Standard',
        description: 'Implement the standard for non-fungible tokens on Stacks',
        readTime: '20 min',
        difficulty: 'Intermediate',
        tags: ['nft', 'sip-009', 'standards']
      },
      {
        id: 'sip-010-tokens',
        title: 'SIP-010 Fungible Tokens',
        description: 'Create fungible tokens following the SIP-010 standard',
        readTime: '18 min',
        difficulty: 'Intermediate',
        tags: ['tokens', 'sip-010', 'fungible']
      },
      {
        id: 'marketplace-development',
        title: 'Building NFT Marketplaces',
        description: 'Create a complete marketplace for trading NFTs',
        readTime: '35 min',
        difficulty: 'Advanced',
        tags: ['marketplace', 'trading', 'nft']
      },
      {
        id: 'metadata-standards',
        title: 'Metadata and Standards',
        description: 'Handle NFT metadata and follow industry standards',
        readTime: '15 min',
        difficulty: 'Intermediate',
        tags: ['metadata', 'ipfs', 'standards']
      }
    ]
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    description: 'Complete API documentation and references',
    icon: '📚',
    articles: [
      {
        id: 'stacks-api',
        title: 'Stacks Blockchain API',
        description: 'Complete reference for the Stacks blockchain API',
        readTime: '25 min',
        difficulty: 'Intermediate',
        tags: ['api', 'blockchain', 'reference']
      },
      {
        id: 'clarity-functions',
        title: 'Clarity Built-in Functions',
        description: 'Reference for all built-in Clarity functions',
        readTime: '30 min',
        difficulty: 'Intermediate',
        tags: ['clarity', 'functions', 'reference']
      },
      {
        id: 'stacks-js-api',
        title: 'Stacks.js API Reference',
        description: 'Complete documentation for the Stacks.js library',
        readTime: '20 min',
        difficulty: 'Intermediate',
        tags: ['stacks.js', 'api', 'javascript']
      }
    ]
  }
]

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const filteredSections = docSections.map(section => ({
    ...section,
    articles: section.articles.filter(article => {
      const matchesDifficulty = selectedDifficulty === 'all' || article.difficulty === selectedDifficulty
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return matchesDifficulty && matchesSearch
    })
  })).filter(section => section.articles.length > 0)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'Advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <section className="pt-16 pb-12 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Comprehensive Developer Resources
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Documentation Hub
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Everything you need to build on Bitcoin with Stacks. From beginner guides to advanced
              patterns, API references, and best practices.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-primary text-white'
                    : 'bg-custom-purple text-gray-700 border border-gray-300 hover:bg-custom-purple/80'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
            <p className="text-lg mb-6 opacity-90">
              New to Bitcoin development? Start here to get up and running in minutes.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/docs/getting-started/setup-environment" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                <div className="text-2xl mb-2">⚙️</div>
                <h3 className="font-semibold mb-2">1. Setup Environment</h3>
                <p className="text-sm opacity-90">Install tools and configure your development environment</p>
              </Link>
              <Link href="/docs/getting-started/first-contract" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                <div className="text-2xl mb-2">📝</div>
                <h3 className="font-semibold mb-2">2. Write Contract</h3>
                <p className="text-sm opacity-90">Create your first smart contract in Clarity</p>
              </Link>
              <Link href="/docs/frontend-integration/stacks-js-intro" className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors">
                <div className="text-2xl mb-2">🌐</div>
                <h3 className="font-semibold mb-2">3. Build Frontend</h3>
                <p className="text-sm opacity-90">Connect your contract to a web application</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Documentation Sections */}
        <section>
          {filteredSections.length > 0 ? (
            <div className="space-y-12">
              {filteredSections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center mb-6">
                    <span className="text-3xl mr-4">{section.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/docs/${section.id}/${article.id}`}
                        className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                            {article.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {article.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {article.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                          {article.tags.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documentation found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or selected difficulty level.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedDifficulty('all')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Additional Resources */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional Resources</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://docs.stacks.co"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Official Stacks Docs</h3>
              <p className="text-gray-600 text-sm">Complete Stacks documentation</p>
            </a>

            <a
              href="https://github.com/hirosystems/clarinet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Clarinet CLI</h3>
              <p className="text-gray-600 text-sm">Development environment for Clarity</p>
            </a>

            <Link
              href="/tutorials"
              className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Tutorials</h3>
              <p className="text-gray-600 text-sm">Hands-on learning with code exercises</p>
            </Link>

            <Link
              href="/community"
              className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Support</h3>
              <p className="text-gray-600 text-sm">Get help from fellow developers</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
