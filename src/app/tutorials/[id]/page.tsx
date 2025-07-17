'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TutorialRenderer from '@/components/TutorialRenderer'
import { Tutorial, CodeSubmission, TutorialProgress } from '@/types'
import { isUserSignedIn, getUserAddress } from '@/lib/wallet'

// Mock tutorial content
const getTutorialContent = (id: string): string => {
  if (id === 'hello-clarity') {
    return `# Hello Clarity

Welcome to your first Clarity smart contract tutorial! In this lesson, you'll learn the basics of the Clarity language and deploy your first contract to the Stacks testnet.

## What is Clarity?

Clarity is a decidable smart contract language that optimizes for predictability and security. Unlike other smart contract languages, Clarity is interpreted (not compiled) and the complete program is published on-chain.

Key features of Clarity:
- **Decidable**: You can know with certainty what a program will do
- **Interpreted**: No compilation step, source code is published on-chain  
- **Non-Turing complete**: Prevents infinite loops and makes programs predictable
- **Secure by design**: Built-in protections against common vulnerabilities

## Your First Function

Let's start with the classic "Hello World" example. In Clarity, we'll create a simple function that returns a greeting.

\`\`\`clarity
(define-public (hello-world)
  (ok "Hello, Bitcoin!"))
\`\`\`

This function:
- Uses \`define-public\` to create a public function anyone can call
- Returns \`(ok "Hello, Bitcoin!")\` - the \`ok\` indicates success
- Takes no parameters (empty parentheses)

[Code Editor]

## Understanding the Syntax

Clarity uses a LISP-like syntax with prefix notation:
- Functions are called with \`(function-name arg1 arg2)\`
- Everything is wrapped in parentheses
- The function name comes first, followed by arguments

## Response Types

Clarity functions return Response types that can be either:
- \`(ok value)\` - indicates success with a value
- \`(err error)\` - indicates an error occurred

This makes error handling explicit and predictable.

## Try It Yourself

In the code editor, try modifying the hello-world function:

1. Change the message to something personal
2. Try creating a new function called \`get-number\` that returns \`(ok u42)\`
3. Create a function that takes a name parameter

[Code Editor]

## Data Types

Clarity has several built-in data types:
- \`uint\` - unsigned integers (u1, u42, u1000)
- \`int\` - signed integers (1, -42, 1000)  
- \`bool\` - booleans (true, false)
- \`string-ascii\` - ASCII strings
- \`string-utf8\` - UTF-8 strings
- \`principal\` - Stacks addresses

## Working with Variables

Let's create a simple counter contract:

\`\`\`clarity
(define-data-var counter uint u0)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

(define-read-only (get-counter)
  (var-get counter))
\`\`\`

[Code Editor]

## Congratulations!

You've completed your first Clarity tutorial! You've learned:
- Basic Clarity syntax and structure
- How to create public and read-only functions
- Working with data types and variables
- Response types for error handling

Ready to earn your certificate? Make sure your wallet is connected and click "Complete Tutorial" below.`
  }
  
  return 'Tutorial content not found.'
}

const mockTutorials: { [key: string]: Tutorial } = {
  'hello-clarity': {
    id: 'hello-clarity',
    title: 'Hello Clarity',
    description: 'Learn the basics of Clarity smart contract language and deploy your first contract to the Stacks blockchain.',
    content: getTutorialContent('hello-clarity'),
    difficulty: 'Beginner',
    estimatedTime: '30 minutes',
    tags: ['clarity', 'basics', 'smart-contracts'],
    author: 'Bitcoin Developer Academy',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    isPublished: true,
    prerequisites: []
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
      setTutorial(tutorialData)
      
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stacks mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tutorial...</p>
        </div>
      </div>
    )
  }

  if (error || !tutorial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
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
        />
      </div>
    </div>
  )
}
