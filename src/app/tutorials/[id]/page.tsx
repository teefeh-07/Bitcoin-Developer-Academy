'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TutorialRenderer from '@/components/TutorialRenderer'
import { Tutorial, CodeSubmission, TutorialProgress } from '@/types'
import { isUserSignedIn, getUserAddress } from '@/lib/wallet'
import { getTutorialContentClient } from '@/lib/tutorials'

const mockTutorials: { [key: string]: Tutorial } = {
  'hello-clarity': {
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
  'your-first-dapp': {
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
    isPublished: true,
    prerequisites: ['hello-clarity']
  },
  'nfts-on-stacks': {
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
    isPublished: true,
    prerequisites: ['hello-clarity', 'your-first-dapp']
  }
}

export default function TutorialPage() {
  const params = useParams()
  const router = useRouter()
  const tutorialId = params.id as string
  
  const [tutorial, setTutorial] = useState<Tutorial | null>(null)
  const [progress, setProgress] = useState<TutorialProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Load tutorial data
    const tutorialData = mockTutorials[tutorialId]
    if (tutorialData) {
      // Load content dynamically
      const content = getTutorialContentClient(tutorialId)
      const tutorialWithContent = {
        ...tutorialData,
        content: content
      }
      setTutorial(tutorialWithContent)

      // Load user progress if signed in
      if (isUserSignedIn()) {
        const userAddress = getUserAddress()
        if (userAddress) {
          // Mock progress data
          setProgress({
            tutorialId,
            userId: userAddress,
            currentStep: 0,
            totalSteps: 5,
            codeSubmissions: []
          })
        }
      }
    } else {
      setError('Tutorial not found')
    }

    setIsLoading(false)
  }, [tutorialId])

  const handleComplete = async (submission: CodeSubmission) => {
    console.log('Code submitted:', submission)
    
    // Update progress
    if (progress) {
      const updatedProgress = {
        ...progress,
        codeSubmissions: [...progress.codeSubmissions, submission]
      }
      setProgress(updatedProgress)
    }

    // If this is the last step and user is signed in, mint certificate
    if (submission.isCorrect && isUserSignedIn()) {
      // This would call the smart contract to mint a certificate
      console.log('Minting certificate for tutorial completion')
    }
  }

  const handleProgress = (step: number) => {
    if (progress) {
      setProgress({
        ...progress,
        currentStep: step
      })
    }
  }

  const handleCompleteTutorial = async () => {
    if (!isUserSignedIn()) {
      alert('Please connect your wallet to earn a certificate!')
      return
    }

    try {
      // This would call the smart contract to mint a certificate
      console.log('Completing tutorial and minting certificate')
      
      // Simulate certificate minting
      setTimeout(() => {
        alert('Congratulations! Your certificate has been minted and will appear in your dashboard shortly.')
        router.push('/dashboard')
      }, 2000)
      
    } catch (error) {
      console.error('Failed to complete tutorial:', error)
      alert('Failed to mint certificate. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-custom-purple flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stacks mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tutorial...</p>
        </div>
      </div>
    )
  }

  if (error || !tutorial) {
    return (
      <div className="min-h-screen bg-custom-purple flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tutorial Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested tutorial could not be found.'}</p>
          <button
            onClick={() => router.push('/tutorials')}
            className="btn-primary"
          >
            Back to Tutorials
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <div className="bg-custom-purple shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/tutorials')}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{tutorial.title}</h1>
                <p className="text-sm text-gray-600">{tutorial.difficulty} • {tutorial.estimatedTime}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {progress && (
                <div className="text-sm text-gray-600">
                  Step {progress.currentStep + 1} of {progress.totalSteps}
                </div>
              )}
              
              {!isUserSignedIn() && (
                <div className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded">
                  Connect wallet to earn certificate
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TutorialRenderer
          tutorial={tutorial}
          onComplete={handleComplete}
          onProgress={handleProgress}
          showCertificateMinter={true}
        />
      </div>
    </div>
  )
}
