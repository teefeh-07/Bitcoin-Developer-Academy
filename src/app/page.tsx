'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-custom-purple">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Join 500+ Bitcoin developers building the future
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight px-4">
              Master Bitcoin Development
              <br />
              <span className="text-primary">Skills</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              The premier platform for learning Bitcoin and Stacks development through interactive tutorials,
              real smart contract deployment, and verifiable NFT certificates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link href="/tutorials" className="btn-primary py-4 px-8 text-lg font-semibold">
                Create Your Profile
              </Link>
              <div className="text-gray-500 text-sm self-center">
                Coming Soon
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">500+</div>
                <div className="text-gray-600 text-sm">Developers</div>
                <div className="text-gray-500 text-xs">Active builders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600 text-sm">Tutorials</div>
                <div className="text-gray-500 text-xs">Interactive courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">150+</div>
                <div className="text-gray-600 text-sm">Certificates</div>
                <div className="text-gray-500 text-xs">Issued on-chain</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">24/7</div>
                <div className="text-gray-600 text-sm">Learning</div>
                <div className="text-gray-500 text-xs">Always available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Build your professional presence in the Bitcoin ecosystem with tools designed specifically for Bitcoin developers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 px-4">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Showcase Your Work</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Create a professional portfolio highlighting your Bitcoin and Stacks projects with verified GitHub integration.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Build Your Reputation</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Earn reputation points through community endorsements, project contributions, and ecosystem participation.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Find Opportunities</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connect with Bitcoin companies, discover job openings, and participate in bounty programs.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Get Discovered</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Make your skills visible to the entire Bitcoin ecosystem and attract opportunities that match your expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Tutorials
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Discover amazing learning paths built by our community
            </p>
            <div className="mt-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                Coming Soon
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
            <div className="bg-custom-purple rounded-xl shadow-lg border border-gray-300 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform float-animation">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">24</span>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Beginner
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">DeFi Yield Optimizer</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Smart contract system for optimizing STX staking rewards with automated rebalancing and risk management.
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Clarity</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">React</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">TypeScript</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">by alice.btc</span>
                <Link href="/tutorials/hello-clarity" className="text-primary hover:text-primary-dark text-sm font-medium">
                  View Tutorial →
                </Link>
              </div>
            </div>

            <div className="bg-custom-purple rounded-xl shadow-lg border border-gray-300 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform float-animation">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">18</span>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Intermediate
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-white">Bitcoin NFT Marketplace</h3>
              <p className="text-gray-200 mb-4 text-sm leading-relaxed">
                Decentralized marketplace for Bitcoin Ordinals with Stacks integration and cross-chain functionality.
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Clarity</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Next.js</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Tailwind</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">by bob.btc</span>
                <button className="text-gray-400 text-sm font-medium cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>

            <div className="bg-custom-purple rounded-xl shadow-lg border border-gray-300 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform float-animation">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">31</span>
                  </div>
                </div>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Advanced
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-white">DAO Governance Tool</h3>
              <p className="text-gray-200 mb-4 text-sm leading-relaxed">
                Comprehensive governance platform for Bitcoin DAOs with voting mechanisms and treasury management.
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Clarity</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Vue.js</span>
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Web3</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">by charlie.btc</span>
                <button className="text-gray-400 text-sm font-medium cursor-not-allowed">
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 px-4">
            Ready to Build Your Reputation?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto px-4">
            Join hundreds of developers who are already showcasing their skills and connecting with opportunities in the Bitcoin ecosystem.
          </p>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
            Coming Soon
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-custom-purple border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src="/BDA.png"
                    alt="Bitcoin Developer Academy Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The premier platform for Bitcoin developers to showcase their work, connect with opportunities, and build their reputation in the Bitcoin ecosystem.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://github.com" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://discord.gg/stacks" className="text-gray-400 hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/tutorials" className="text-gray-600 hover:text-primary transition-colors">Tutorials</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="/certificates" className="text-gray-600 hover:text-primary transition-colors">Certificates</Link></li>
                <li><Link href="/community" className="text-gray-600 hover:text-primary transition-colors">Community</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/docs" className="text-gray-600 hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/api-docs" className="text-gray-600 hover:text-primary transition-colors">API Reference</Link></li>
                <li><Link href="/tutorials" className="text-gray-600 hover:text-primary transition-colors">Tutorials</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-600 hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-gray-600 text-sm">
              © 2025 Bitcoin Developer Academy. Built on Bitcoin with Stacks.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Made with ❤️ for the Bitcoin developer community
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
