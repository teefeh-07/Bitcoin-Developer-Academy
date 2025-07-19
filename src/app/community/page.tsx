'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ForumPost {
  id: string
  title: string
  content: string
  author: string
  category: string
  replies: number
  views: number
  lastActivity: Date
  tags: string[]
  solved?: boolean
}

interface CommunityEvent {
  id: string
  title: string
  description: string
  date: Date
  type: 'meetup' | 'workshop' | 'hackathon' | 'webinar'
  location: string
  attendees: number
  maxAttendees?: number
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'How to optimize gas costs in Clarity contracts?',
    content: 'I\'m working on a DeFi protocol and looking for ways to reduce transaction costs. Any best practices?',
    author: 'alice.btc',
    category: 'Development',
    replies: 12,
    views: 156,
    lastActivity: new Date('2024-01-20'),
    tags: ['clarity', 'optimization', 'gas'],
    solved: true
  },
  {
    id: '2',
    title: 'Stacks 2.5 Nakamoto Release Discussion',
    content: 'What are your thoughts on the upcoming Nakamoto release? How will it impact existing dApps?',
    author: 'bob.stx',
    category: 'General',
    replies: 28,
    views: 342,
    lastActivity: new Date('2024-01-19'),
    tags: ['nakamoto', 'upgrade', 'discussion']
  },
  {
    id: '3',
    title: 'NFT marketplace smart contract review needed',
    content: 'Built my first NFT marketplace contract. Would appreciate code review and feedback from the community.',
    author: 'charlie.dev',
    category: 'Code Review',
    replies: 8,
    views: 89,
    lastActivity: new Date('2024-01-18'),
    tags: ['nft', 'marketplace', 'review']
  },
  {
    id: '4',
    title: 'Bitcoin Developer Academy feedback and suggestions',
    content: 'Love the platform! Here are some ideas for new features and improvements.',
    author: 'diana.builder',
    category: 'Feedback',
    replies: 15,
    views: 203,
    lastActivity: new Date('2024-01-17'),
    tags: ['feedback', 'features', 'platform']
  }
]

const communityEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Bitcoin Developer Meetup - San Francisco',
    description: 'Monthly meetup for Bitcoin and Stacks developers. This month: Building DeFi on Bitcoin.',
    date: new Date('2024-02-15'),
    type: 'meetup',
    location: 'San Francisco, CA',
    attendees: 45,
    maxAttendees: 60
  },
  {
    id: '2',
    title: 'Clarity Smart Contract Workshop',
    description: 'Hands-on workshop covering advanced Clarity patterns and best practices.',
    date: new Date('2024-02-20'),
    type: 'workshop',
    location: 'Online',
    attendees: 128,
    maxAttendees: 150
  },
  {
    id: '3',
    title: 'Bitcoin Builders Hackathon',
    description: '48-hour hackathon focused on building innovative Bitcoin applications using Stacks.',
    date: new Date('2024-03-01'),
    type: 'hackathon',
    location: 'New York, NY',
    attendees: 89,
    maxAttendees: 200
  },
  {
    id: '4',
    title: 'sBTC Integration Webinar',
    description: 'Learn how to integrate sBTC into your applications with live coding examples.',
    date: new Date('2024-02-25'),
    type: 'webinar',
    location: 'Online',
    attendees: 234
  }
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', 'Development', 'General', 'Code Review', 'Feedback']

  const filteredPosts = forumPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meetup': return 'bg-blue-100 text-blue-800'
      case 'workshop': return 'bg-green-100 text-green-800'
      case 'hackathon': return 'bg-purple-100 text-purple-800'
      case 'webinar': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
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
              Join the Conversation
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Bitcoin Developer Community
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with fellow Bitcoin developers, share knowledge, get help with your projects,
              and collaborate on building the future of Bitcoin applications.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="btn-primary">
                Join Discord
              </button>
              <button className="btn-secondary">
                Start Discussion
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-gray-600">Community Members</div>
              <div className="text-gray-500 text-sm">Active developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">450+</div>
              <div className="text-gray-600">Forum Posts</div>
              <div className="text-gray-500 text-sm">This month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">89%</div>
              <div className="text-gray-600">Questions Answered</div>
              <div className="text-gray-500 text-sm">Within 24 hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-gray-600">Events Monthly</div>
              <div className="text-gray-500 text-sm">Meetups & workshops</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forum */}
          <div className="lg:col-span-2">
            {/* Forum Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Community Forum</h2>
              <button className="btn-primary text-sm">
                New Post
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-custom-purple text-gray-700 border border-gray-300 hover:bg-custom-purple/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-primary cursor-pointer">
                          {post.title}
                        </h3>
                        {post.solved && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Solved
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {post.content}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      post.category === 'Development' ? 'bg-blue-100 text-blue-800' :
                      post.category === 'General' ? 'bg-gray-100 text-gray-800' :
                      post.category === 'Code Review' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>By {post.author}</span>
                      <span>{post.lastActivity.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {post.replies}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {post.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or selected category.
                </p>
                <button className="btn-primary">
                  Start a Discussion
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Events & Resources */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h3>

              <div className="space-y-4">
                {communityEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {event.date.toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{event.location}</span>
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/events" className="btn-secondary w-full mt-4 text-center block">
                View All Events
              </Link>
            </div>

            {/* Community Resources */}
            <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Resources</h3>

              <div className="space-y-3">
                <a href="https://discord.gg/stacks" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Discord Server</div>
                    <div className="text-sm text-gray-600">Real-time chat and support</div>
                  </div>
                </a>

                <a href="https://github.com/stacks-network" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">GitHub</div>
                    <div className="text-sm text-gray-600">Open source contributions</div>
                  </div>
                </a>

                <Link href="/docs" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Documentation</div>
                    <div className="text-sm text-gray-600">Guides and references</div>
                  </div>
                </Link>

                <Link href="/tutorials" className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Tutorials</div>
                    <div className="text-sm text-gray-600">Interactive learning</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Guidelines</h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Be respectful and constructive in all interactions</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Share knowledge and help others learn</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Use clear titles and descriptions for posts</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Search before posting to avoid duplicates</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mark solutions when your question is answered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
