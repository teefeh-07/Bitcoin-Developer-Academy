'use client'

import { useState } from 'react'
import { Certificate } from '@/types'

interface CertificateCardProps {
  certificate: Certificate
  showDetails?: boolean
  onShare?: () => void
}

export default function CertificateCard({ 
  certificate, 
  showDetails = false, 
  onShare 
}: CertificateCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner'
      case 2: return 'Intermediate'
      case 3: return 'Advanced'
      case 4: return 'Expert'
      default: return 'Unknown'
    }
  }

  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'text-green-600'
      case 2: return 'text-yellow-600'
      case 3: return 'text-orange-600'
      case 4: return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const handleShare = () => {
    if (onShare) {
      onShare()
    } else {
      // Default share functionality
      const shareUrl = `${window.location.origin}/certificates/${certificate.tokenId}`
      navigator.clipboard.writeText(shareUrl)
      alert('Certificate link copied to clipboard!')
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div 
        className={`certificate-card relative w-full h-64 cursor-pointer transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="certificate-card-premium h-full flex flex-col justify-between p-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Bitcoin Developer Academy
                </h3>
                <p className="text-white/80 text-sm">Certificate of Completion</p>
              </div>
              <div className="text-right">
                <div className="text-white/80 text-xs">Token ID</div>
                <div className="text-white font-mono text-sm">#{certificate.tokenId}</div>
              </div>
            </div>

            {/* Course Name */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                {certificate.courseName}
              </h2>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white`}>
                {getSkillLevelText(certificate.skillLevel)}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div>
                <div className="text-white/80 text-xs">Completed</div>
                <div className="text-white text-sm">{formatDate(certificate.completionDate)}</div>
              </div>
              <div className="text-white/60">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="bg-white border-2 border-gray-200 rounded-lg h-full p-6 flex flex-col justify-between">
            {/* Certificate Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certificate Details</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Course:</span>
                  <span className="ml-2 text-gray-600">{certificate.courseName}</span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Skill Level:</span>
                  <span className={`ml-2 font-medium ${getSkillLevelColor(certificate.skillLevel)}`}>
                    {getSkillLevelText(certificate.skillLevel)}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Completed:</span>
                  <span className="ml-2 text-gray-600">{formatDate(certificate.completionDate)}</span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Recipient:</span>
                  <span className="ml-2 text-gray-600 font-mono text-xs">
                    {certificate.recipient.slice(0, 8)}...{certificate.recipient.slice(-8)}
                  </span>
                </div>
                
                <div>
                  <span className="font-medium text-gray-700">Transaction:</span>
                  <span className="ml-2 text-gray-600 font-mono text-xs">
                    {certificate.transactionId.slice(0, 8)}...{certificate.transactionId.slice(-8)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleShare()
                }}
                className="flex-1 btn-primary text-sm py-2"
              >
                Share
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`https://explorer.stacks.co/txid/${certificate.transactionId}`, '_blank')
                }}
                className="flex-1 btn-secondary text-sm py-2"
              >
                View on Explorer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click hint */}
      <div className="text-center mt-2">
        <span className="text-xs text-gray-500">Click to flip</span>
      </div>
    </div>
  )
}
