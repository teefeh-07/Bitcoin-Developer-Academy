'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tutorial } from '@/types'

// Mock tutorial data
const mockTutorials: Tutorial[] = [
  {
    id: 'hello-clarity',
    title: 'Hello Clarity',
    description: 'Learn the basics of Clarity smart contract language and deploy your first contract to the Stacks blockchain.',
    content: '',
    difficulty: 'Beginner',
    estimatedTime: '30 minutes',
    tags: ['clarity', 'basics', 'smart-contracts'],
    author: 'Bitcoin Developer Academy',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isPublished: true,
    prerequisites: []
  },
  {
    id: 'your-first-dapp',
    title: 'Your First DApp',
    description: 'Build a complete decentralized application with frontend integration using React and Stacks.js.',
    content: '',
    difficulty: 'Intermediate',
    estimatedTime: '2 hours',
    tags: ['dapp', 'frontend', 'react', 'stacks.js'],
    author: 'Bitcoin Developer Academy',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isPublished: false,
    prerequisites: ['hello-clarity']
  },
  {
    id: 'nfts-on-stacks',
    title: 'NFTs on Stacks',
    description: 'Master NFT standards and build a complete marketplace with minting, trading, and royalties.',
    content: '',
    difficulty: 'Advanced',
    estimatedTime: '3 hours',
    tags: ['nft', 'marketplace', 'sip-009', 'advanced'],
    author: 'Bitcoin Developer Academy',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    isPublished: false,
    prerequisites: ['hello-clarity', 'your-first-dapp']
  }
]

export default function TutorialsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredTutorials = mockTutorials.filter(tutorial => {
    const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesDifficulty && matchesSearch
  })

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 px-4">
              Interactive Tutorials
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Learn Bitcoin development through hands-on tutorials. Write real smart contracts,
              deploy to testnet, and earn verifiable certificates.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-0.5 rounded text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">{tutorial.estimatedTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {tutorial.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {tutorial.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{tutorial.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Prerequisites */}
                {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">Prerequisites:</span>
                    <div className="mt-1">
                      {tutorial.prerequisites.map((prereq) => (
                        <span
                          key={prereq}
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded mr-2"
                        >
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {tutorial.author}
                  </span>
                  
                  {tutorial.isPublished ? (
                    <Link
                      href={`/tutorials/${tutorial.id}`}
                      className="btn-primary text-sm"
                    >
                      Start Tutorial
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="btn-secondary text-sm opacity-50 cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or difficulty filter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
