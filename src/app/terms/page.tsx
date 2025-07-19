export default function TermsPage() {
  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <section className="pt-16 pb-12 bg-custom-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Last updated: January 20, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-custom-purple rounded-lg shadow-md border border-gray-300 p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using Bitcoin Developer Academy ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Bitcoin Developer Academy is an educational platform that provides:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Interactive tutorials for Bitcoin and Stacks development</li>
              <li>Smart contract development tools and environments</li>
              <li>Blockchain-verified certificates as NFTs</li>
              <li>Community forums and developer resources</li>
              <li>API access for educational content and progress tracking</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Wallet Connection</h2>
            <p className="text-gray-700 mb-4">
              To access certain features of the Platform, you must connect a compatible Stacks wallet. You are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Maintaining the security of your wallet and private keys</li>
              <li>All activities that occur under your wallet address</li>
              <li>Ensuring your wallet connection is secure and authorized</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Educational Content and Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All educational content, tutorials, and materials provided on the Platform are owned by Bitcoin Developer Academy or its licensors. You may:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Access and use the content for personal educational purposes</li>
              <li>Share links to our content with proper attribution</li>
              <li>Use code examples in your own projects with attribution</li>
            </ul>
            <p className="text-gray-700 mb-6">
              You may not reproduce, distribute, or create derivative works from our content without explicit permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. NFT Certificates</h2>
            <p className="text-gray-700 mb-4">
              Upon completing tutorials, you may receive NFT certificates on the Stacks blockchain. These certificates:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Are minted to your connected wallet address</li>
              <li>Serve as verifiable proof of course completion</li>
              <li>Are non-transferable and tied to your learning progress</li>
              <li>May be revoked in cases of fraud or terms violation</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Community Guidelines</h2>
            <p className="text-gray-700 mb-4">
              When participating in our community forums and discussions, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Be respectful and constructive in all interactions</li>
              <li>Not post spam, offensive, or inappropriate content</li>
              <li>Respect intellectual property rights of others</li>
              <li>Not engage in harassment or discriminatory behavior</li>
              <li>Follow all applicable laws and regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                Email: legal@bitcoindev.academy<br />
                Website: https://bitcoindev.academy/contact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
