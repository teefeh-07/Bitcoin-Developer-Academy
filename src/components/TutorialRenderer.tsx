'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeEditor from './CodeEditor'
import CertificateMinter from './CertificateMinter'
import { Tutorial, CodeSubmission } from '@/types'

interface TutorialRendererProps {
  tutorial: Tutorial
  onComplete: (submission: CodeSubmission) => void
  onProgress: (step: number) => void
  showCertificateMinter?: boolean
}

export default function TutorialRenderer({
  tutorial,
  onComplete,
  onProgress,
  showCertificateMinter = true
}: TutorialRendererProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<string>('')

  // Parse tutorial content into steps
  const steps = tutorial.content.split('## ').filter(Boolean).map((step, index) => ({
    id: index,
    title: step.split('\n')[0],
    content: step.substring(step.indexOf('\n') + 1),
    hasCodeExercise: step.includes('```clarity') || step.includes('[Code Editor]')
  }))

  const currentStepData = steps[currentStep]

  const handleCodeChange = (code: string) => {
    setUserCode(code)
  }

  const handleRunCode = async (code: string) => {
    // Simulate code execution
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Executing code:', code)
        resolve('Code executed successfully!')
      }, 1000)
    })
  }

  const handleSubmitCode = async () => {
    setIsSubmitting(true)
    setFeedback('')

    try {
      // Simulate code validation
      const isCorrect = userCode.includes('define-public') || userCode.includes('define-read-only')
      
      const submission: CodeSubmission = {
        stepId: currentStepData.id.toString(),
        code: userCode,
        isCorrect,
        submittedAt: new Date(),
        feedback: isCorrect ? 'Great job! Your code looks correct.' : 'Try adding a function definition.'
      }

      setFeedback(submission.feedback || '')
      
      if (isCorrect) {
        onComplete(submission)
        setTimeout(() => {
          handleNextStep()
        }, 2000)
      }
    } catch (error) {
      setFeedback('An error occurred while checking your code.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setUserCode('')
      setFeedback('')
      onProgress(nextStep)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      setUserCode('')
      setFeedback('')
      onProgress(prevStep)
    }
  }

  const getStarterCode = () => {
    if (currentStepData.content.includes('hello-world')) {
      return `;; Your first Clarity function
(define-public (hello-world)
  (ok "Hello, Bitcoin!"))

;; Try calling this function!`
    }
    
    if (currentStepData.content.includes('counter')) {
      return `;; A simple counter contract
(define-data-var counter uint u0)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

(define-read-only (get-counter)
  (var-get counter))`
    }

    return `;; Write your Clarity code here
;; Remember: functions start with (define-public ...) or (define-read-only ...)

`
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">{tutorial.title}</h1>
          <span className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="progress-bar-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Tutorial Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Tutorial Content */}
        <div className="tutorial-content">
          <h2 className="text-xl font-semibold mb-4">{currentStepData.title}</h2>
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
              }
            }}
          >
            {currentStepData.content}
          </ReactMarkdown>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 pt-6 border-t">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className={`btn-secondary ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>
            
            {currentStep === steps.length - 1 ? (
              <button className="btn-primary">
                Complete Tutorial
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                className="btn-primary"
              >
                Next Step
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Code Editor */}
        {currentStepData.hasCodeExercise && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Try it yourself</h3>
              <p className="text-gray-600 text-sm">
                Write and test your Clarity code in the editor below.
              </p>
            </div>

            <CodeEditor
              initialCode={getStarterCode()}
              language="clarity"
              onCodeChange={handleCodeChange}
              onRun={handleRunCode}
              height="300px"
            />

            {/* Submit Button */}
            <div className="mt-4">
              <button
                onClick={handleSubmitCode}
                disabled={isSubmitting || !userCode.trim()}
                className={`btn-primary w-full ${
                  isSubmitting || !userCode.trim() 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
              >
                {isSubmitting ? 'Checking...' : 'Submit Code'}
              </button>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                feedback.includes('Great job') 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              }`}>
                <p className="text-sm">{feedback}</p>
              </div>
            )}
          </div>
        )}

        {/* Certificate Minter - Show at the end of tutorial */}
        {showCertificateMinter && currentStep === steps.length - 1 && (
          <div className="mt-8">
            <CertificateMinter
              courseId={tutorial.id}
              onSuccess={(txId, tokenId) => {
                console.log('Certificate minted:', { txId, tokenId })
                // Could trigger confetti or other celebration effects
              }}
              onError={(error) => {
                console.error('Certificate minting error:', error)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
