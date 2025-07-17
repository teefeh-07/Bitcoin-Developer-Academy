'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CertificateCard from '@/components/CertificateCard'
import ProgressBar from '@/components/ProgressBar'
import { isUserSignedIn, getUserAddress, getUserData } from '@/lib/wallet'
import { Certificate, UserProgress, Course } from '@/types'

// Mock data
const mockCertificates: Certificate[] = [
  {
    tokenId: 1,
    courseId: 1,
    courseName: 'Hello Clarity',
    recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    completionDate: new Date('2024-01-15'),
    skillLevel: 1,
    ipfsMetadata: 'QmHash123456789',
    transactionId: '0x1234567890abcdef1234567890abcdef12345678'
  }
]

const mockProgress: UserProgress = {
  completedModules: [1, 2, 3],
  currentCourse: 1,
  totalPoints: 150,
  currentStreak: 5,
  lastActivity: new Date(),
  skillLevel: 1,
  totalTimeSpent: 180
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Hello Clarity',
    description: 'Learn the basics of Clarity smart contract language',
    difficulty: 'Beginner',
    modules: [],
    estimatedTime: '30 minutes',
    tags: ['clarity', 'basics'],
    isPublished: true,
    author: 'Bitcoin Developer Academy'
  },
  {
    id: 2,
    title: 'Your First DApp',
    description: 'Build a complete decentralized application',
    difficulty: 'Intermediate',
    modules: [],
    estimatedTime: '2 hours',
    tags: ['dapp', 'frontend'],
    isPublished: false,
    author: 'Bitcoin Developer Academy'
  }
]

export default function DashboardPage() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkConnection = () => {
      const connected = isUserSignedIn()
      setIsConnected(connected)
      
      if (connected) {
        const address = getUserAddress()
        setUserAddress(address || null)
        
        // Load user data
        setCertificates(mockCertificates)
        setProgress(mockProgress)
      }
      
      setIsLoading(false)
    }

    checkConnection()
  }, [])

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner'
      case 2: return 'Intermediate'
      case 3: return 'Advanced'
      case 4: return 'Expert'
      default: return 'Unknown'
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stacks mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 mb-6">
              Connect your Stacks wallet to view your learning progress, certificates, and achievements.
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary w-full"
            >
              Connect Wallet
            </button>
            <Link href="/tutorials" className="btn-secondary w-full block text-center">
              Browse Tutorials
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Track your progress and manage your certificates.
              </p>
            </div>
            
            {userAddress && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Connected as</div>
                <div className="font-mono text-sm text-gray-900">{formatAddress(userAddress)}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {progress && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Modules Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{progress.completedModules.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-secondary rounded-lg">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900">{progress.totalPoints}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-bitcoin rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{progress.currentStreak} days</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Skill Level</p>
                  <p className="text-2xl font-bold text-gray-900">{getSkillLevelText(progress.skillLevel)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Progress & Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Progress */}
            {progress && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Progress</h2>
                
                {progress.currentCourse && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Current Course</span>
                      <span className="text-sm text-gray-600">
                        {mockCourses.find(c => c.id === progress.currentCourse)?.title}
                      </span>
                    </div>
                    <ProgressBar
                      current={progress.completedModules.length}
                      total={10}
                      color="primary"
                      showPercentage={true}
                    />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Time Spent Learning</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {Math.floor(progress.totalTimeSpent / 60)}h {progress.totalTimeSpent % 60}m
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Last Activity</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {progress.lastActivity.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Available Courses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
              
              <div className="space-y-4">
                {mockCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {course.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{course.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        {course.isPublished ? (
                          <Link
                            href={`/tutorials/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                            className="btn-primary text-sm"
                          >
                            {progress?.currentCourse === course.id ? 'Continue' : 'Start'}
                          </Link>
                        ) : (
                          <button disabled className="btn-secondary text-sm opacity-50 cursor-not-allowed">
                            Coming Soon
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Certificates */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Certificates</h2>
              
              {certificates.length > 0 ? (
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <CertificateCard
                      key={certificate.tokenId}
                      certificate={certificate}
                      showDetails={false}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
                  <p className="text-gray-600 mb-4">
                    Complete tutorials to earn your first certificate!
                  </p>
                  <Link href="/tutorials" className="btn-primary text-sm">
                    Start Learning
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
