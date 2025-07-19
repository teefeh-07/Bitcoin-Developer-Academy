'use client'

import { useState } from 'react'
import { completeTutorialAndMint, getCourseInfo } from '@/lib/certificateMinting'
import { isUserSignedIn, getUserAddress } from '@/lib/wallet'

interface CertificateMinterProps {
  courseId: string
  onSuccess?: (txId: string, tokenId: number) => void
  onError?: (error: string) => void
  disabled?: boolean
  className?: string
}

export default function CertificateMinter({ 
  courseId, 
  onSuccess, 
  onError, 
  disabled = false,
  className = ''
}: CertificateMinterProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [progress, setProgress] = useState(0)
  const [txId, setTxId] = useState<string | null>(null)
  const [tokenId, setTokenId] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const courseInfo = getCourseInfo(courseId)
  const isConnected = isUserSignedIn()
  const userAddress = getUserAddress()

  const handleMint = async () => {
    if (!isConnected || !userAddress) {
      onError?.('Please connect your wallet first')
      return
    }

    if (!courseInfo) {
      onError?.('Invalid course ID')
      return
    }

    setIsLoading(true)
    setProgress(0)
    setCurrentStep('Starting...')

    try {
      await completeTutorialAndMint(
        courseId,
        userAddress,
        (step) => {
          setCurrentStep(step)
          // Update progress based on step
          if (step.includes('metadata')) setProgress(20)
          else if (step.includes('IPFS')) setProgress(40)
          else if (step.includes('transaction')) setProgress(60)
          else if (step.includes('confirmation')) setProgress(80)
          else if (step.includes('submitted')) setProgress(90)
        },
        (transactionId, tokenIdResult) => {
          setTxId(transactionId)
          setTokenId(tokenIdResult)
          setProgress(100)
          setCurrentStep('Certificate minted successfully!')
          setIsComplete(true)
          onSuccess?.(transactionId, tokenIdResult)
        },
        (error) => {
          setCurrentStep(`Error: ${error}`)
          onError?.(error)
        }
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setCurrentStep(`Error: ${errorMessage}`)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsLoading(false)
    setCurrentStep('')
    setProgress(0)
    setTxId(null)
    setTokenId(null)
    setIsComplete(false)
  }

  if (!courseInfo) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">Invalid course configuration</p>
      </div>
    )
  }

  if (isComplete && txId && tokenId) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            🎉 Certificate Minted Successfully!
          </h3>
          
          <p className="text-green-700 mb-4">
            Congratulations! You've earned your <strong>{courseInfo.name}</strong> certificate.
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-2">Certificate Details:</div>
            <div className="space-y-1 text-sm">
              <div><strong>Token ID:</strong> #{tokenId}</div>
              <div><strong>Transaction:</strong> 
                <a 
                  href={`https://explorer.stacks.co/txid/${txId}?chain=testnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 ml-1 break-all"
                >
                  {txId?.slice(0, 8)}...{txId?.slice(-8)}
                </a>
              </div>
              <div><strong>Skill Level:</strong> {courseInfo.skillLevel}</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/certificates"
              className="btn-primary text-center"
            >
              View My Certificates
            </a>
            <button
              onClick={handleReset}
              className="btn-secondary"
            >
              Mint Another
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-custom-purple border border-gray-300 rounded-lg p-6 ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Earn Your Certificate
        </h3>
        
        <p className="text-gray-600 mb-6">
          Complete this tutorial to earn a verifiable NFT certificate for <strong>{courseInfo.name}</strong> 
          (Skill Level {courseInfo.skillLevel}).
        </p>

        {!isConnected ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              Please connect your wallet to mint your certificate.
            </p>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="mb-6">
                <div className="bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{currentStep}</p>
              </div>
            )}

            <button
              onClick={handleMint}
              disabled={disabled || isLoading || !isConnected}
              className={`btn-primary w-full ${
                (disabled || isLoading || !isConnected) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Minting Certificate...</span>
                </div>
              ) : (
                'Mint Certificate NFT'
              )}
            </button>
          </>
        )}

        <div className="mt-4 text-xs text-gray-500">
          <p>Your certificate will be minted as an NFT on the Stacks blockchain</p>
          <p>and can be verified by anyone using your wallet address.</p>
        </div>
      </div>
    </div>
  )
}
