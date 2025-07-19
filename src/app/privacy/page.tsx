export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Header */}
      <section className="pt-16 pb-12 bg-custom-purple">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Privacy Policy
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-6">
              Bitcoin Developer Academy ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Wallet Information</h3>
            <p className="text-gray-700 mb-4">
              When you connect your Stacks wallet, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Your wallet address (public key)</li>
              <li>BNS (Bitcoin Name System) name, if available</li>
              <li>Transaction signatures for authentication</li>
              <li>Blockchain transaction history related to our platform</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Learning Progress Data</h3>
            <p className="text-gray-700 mb-4">
              To track your educational progress, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Tutorial completion status</li>
              <li>Exercise submissions and code</li>
              <li>Time spent on learning activities</li>
              <li>Quiz and assessment results</li>
              <li>Certificate achievements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Providing and maintaining our educational services</li>
              <li>Tracking your learning progress and achievements</li>
              <li>Issuing blockchain-verified certificates</li>
              <li>Personalizing your learning experience</li>
              <li>Facilitating community interactions</li>
              <li>Improving our platform and content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-6">
              We implement appropriate technical and organizational security measures to protect your information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Disconnect your wallet at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                Email: privacy@bitcoindev.academy<br />
                Website: https://bitcoindev.academy/contact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
