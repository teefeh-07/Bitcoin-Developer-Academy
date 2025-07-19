'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import CertificateCard from '@/components/CertificateCard'
import { isUserSignedIn, getUserAddress } from '@/lib/wallet'
import { getCertificatesByOwner, getMockCertificates, verifyCertificate } from '@/lib/blockchain'
import { Certificate } from '@/types'

// Public certificates for showcase - these would come from a public API in production
const getPublicCertificates = (): Certificate[] => [
  {
    tokenId: 101,
    courseId: 1,
    courseName: 'Hello Clarity',
    recipient: 'alice.btc',
    completionDate: new Date('2024-01-10'),
    skillLevel: 1,
    ipfsMetadata: 'QmHashPublic1',
    transactionId: '0xpublic1234567890abcdef1234567890abcdef12'
  },
  {
    tokenId: 102,
    courseId: 2,
    courseName: 'Your First DApp',
    recipient: 'bob.stx',
    completionDate: new Date('2024-01-12'),
    skillLevel: 2,
    ipfsMetadata: 'QmHashPublic2',
    transactionId: '0xpublic567890abcdef1234567890abcdef123456'
  },
  {
    tokenId: 103,
    courseId: 3,
    courseName: 'NFTs on Stacks',
    recipient: 'charlie.dev',
    completionDate: new Date('2024-01-14'),
    skillLevel: 3,
    ipfsMetadata: 'QmHashPublic3',
    transactionId: '0xpublicabcdef1234567890abcdef1234567890ab'
  },
  {
    tokenId: 104,
    courseId: 1,
    courseName: 'Hello Clarity',
    recipient: 'diana.builder',
    completionDate: new Date('2024-01-16'),
    skillLevel: 1,
    ipfsMetadata: 'QmHashPublic4',
    transactionId: '0xpublic890abcdef1234567890abcdef123456789'
  }
]

export default function CertificatesPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [userCertificates, setUserCertificates] = useState<Certificate[]>([])
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUserData = async () => {
      const connected = isUserSignedIn()
      setIsConnected(connected)

      if (connected) {
        const address = getUserAddress()
        setUserAddress(address || null)

        if (address) {
          try {
            // Fetch user's certificates from blockchain
            const certificates = await getCertificatesByOwner(address)

            // If no certificates found, use mock data for demo
            if (certificates.length === 0) {
              setUserCertificates(getMockCertificates())
            } else {
              setUserCertificates(certificates)
            }
          } catch (err) {
            console.error('Error loading certificates:', err)
            setError('Failed to load certificates')
            // Fallback to mock data
            setUserCertificates(getMockCertificates())
          }
        }
      }

      setIsLoading(false)
    }

    loadUserData()
  }, [])

  const filters = ['all', 'beginner', 'intermediate', 'advanced']
  const publicCertificates = getPublicCertificates()

  const filteredPublicCertificates = publicCertificates.filter(cert => {
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'beginner' && cert.skillLevel === 1) ||
      (selectedFilter === 'intermediate' && cert.skillLevel === 2) ||
      (selectedFilter === 'advanced' && cert.skillLevel === 3)

    const matchesSearch = cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.recipient.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Beginner'
      case 2: return 'Intermediate'
      case 3: return 'Advanced'
      case 4: return 'Expert'
      default: return 'Unknown'
    }
  }

  const handleShare = (certificate: Certificate) => {
    const shareText = `I just earned a ${certificate.courseName} certificate from Bitcoin Developer Academy! 🎓 #BitcoinDev #Stacks`
    const shareUrl = `${window.location.origin}/certificates/verify/${certificate.tokenId}`

    if (navigator.share) {
      navigator.share({
        title: 'Bitcoin Developer Certificate',
        text: shareText,
        url: shareUrl
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      alert('Certificate link copied to clipboard!')
    }
  }

  const handleVerify = async (certificate: Certificate) => {
    try {
      const isValid = await verifyCertificate(certificate.tokenId)
      if (isValid) {
        alert(`Certificate verified! Token ID: ${certificate.tokenId}\nTransaction: ${certificate.transactionId}`)
      } else {
        alert('Certificate verification failed. This certificate may not exist on the blockchain.')
      }
    } catch (error) {
      console.error('Verification error:', error)
      alert('Error verifying certificate. Please try again later.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-custom-purple flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <section className="pt-16 pb-12 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Verifiable On-Chain Credentials
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Certificate Gallery
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Browse and showcase earned certificates. Each certificate is a verifiable NFT on the Stacks blockchain,
              proving Bitcoin development skills and achievements.
            </p>

            {!isConnected && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto mb-8">
                <p className="text-yellow-800 text-sm">
                  Connect your wallet to view your personal certificates
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User Certificates Section */}
        {isConnected && userCertificates.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Your Certificates</h2>
              <span className="text-sm text-gray-600">
                {userCertificates.length} certificate{userCertificates.length !== 1 ? 's' : ''} earned
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCertificates.map((certificate) => (
                <div key={certificate.tokenId} className="relative">
                  <CertificateCard
                    certificate={certificate}
                    showDetails={true}
                    onShare={() => handleShare(certificate)}
                  />
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleShare(certificate)}
                      className="btn-primary text-sm flex-1"
                    >
                      Share
                    </button>
                    <button
                      onClick={() => handleVerify(certificate)}
                      className="btn-secondary text-sm flex-1"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Connect Wallet CTA */}
        {!isConnected && (
          <section className="mb-16">
            <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Your Wallet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Connect your Stacks wallet to view your earned certificates and track your learning progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary">
                  Connect Wallet
                </button>
                <Link href="/tutorials" className="btn-secondary">
                  Start Learning
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Community Certificates</h2>
            <span className="text-sm text-gray-600">
              {filteredPublicCertificates.length} of {publicCertificates.length} certificates
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by course or recipient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                    selectedFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-custom-purple text-gray-700 border border-gray-300 hover:bg-custom-purple/80'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Public Certificates Grid */}
        <section>
          {filteredPublicCertificates.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPublicCertificates.map((certificate) => (
                <div key={certificate.tokenId} className="group">
                  <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-6 hover:shadow-lg transition-shadow">
                    {/* Certificate Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        certificate.skillLevel === 1 ? 'bg-green-100 text-green-800' :
                        certificate.skillLevel === 2 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {getSkillLevelText(certificate.skillLevel)}
                      </span>
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>

                    {/* Course Name */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {certificate.courseName}
                    </h3>

                    {/* Recipient */}
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center mr-2">
                        <span className="text-white text-xs font-bold">
                          {certificate.recipient.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">{certificate.recipient}</span>
                    </div>

                    {/* Completion Date */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>Completed</span>
                      <span>{certificate.completionDate.toLocaleDateString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleVerify(certificate)}
                        className="btn-secondary text-xs flex-1"
                      >
                        Verify
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or selected filter.
              </p>
              <Link href="/tutorials" className="btn-primary">
                Start Learning to Earn Certificates
              </Link>
            </div>
          )}
        </section>

        {/* Certificate Info */}
        <section className="mt-16 bg-custom-purple rounded-lg shadow-md border border-gray-300 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">About Our Certificates</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Blockchain Verified</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every certificate is minted as an NFT on the Stacks blockchain, providing
                tamper-proof verification of your achievements and skills.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Industry Recognized</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our certificates are recognized by leading Bitcoin companies and can be
                verified by employers and collaborators worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Skill Progression</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Certificates are awarded at different skill levels, allowing you to
                demonstrate your progression from beginner to expert developer.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Shareable & Portable</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Share your certificates on social media, add them to your portfolio,
                or include them in job applications with verifiable proof.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
