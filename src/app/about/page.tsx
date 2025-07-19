'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-custom-purple">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Building the Future of Bitcoin Education
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About Bitcoin Developer Academy
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize Bitcoin development education through interactive learning,
              verifiable credentials, and a thriving community of builders.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Bitcoin Developer Academy exists to bridge the gap between traditional software development
                and the unique challenges of building on Bitcoin. We believe that education should be
                practical, verifiable, and accessible to developers worldwide.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                By combining interactive tutorials, real smart contract deployment, and blockchain-verified
                certificates, we're creating the definitive platform for Bitcoin development education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/tutorials" className="btn-primary">
                  Start Learning
                </Link>
                <Link href="/community" className="btn-secondary">
                  Join Community
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Bitcoin Development?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Build on the most secure blockchain network</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create applications with real-world impact</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Join a growing ecosystem of innovation</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-white mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access high-demand career opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at Bitcoin Developer Academy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Learn by Doing</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe the best way to learn blockchain development is through hands-on experience
                with real smart contracts and live deployments.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Verifiable Credentials</h3>
              <p className="text-gray-600 leading-relaxed">
                Every achievement is recorded on-chain as an NFT certificate, providing
                tamper-proof verification of your skills and accomplishments.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">
                Our curriculum evolves with the ecosystem through community contributions,
                peer reviews, and collaborative learning experiences.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Bitcoin Native</h3>
              <p className="text-gray-600 leading-relaxed">
                Built specifically for Bitcoin development using Stacks, providing
                first-class integration with Bitcoin's security and ecosystem.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Open Source</h3>
              <p className="text-gray-600 leading-relaxed">
                Transparency and collaboration are core to our mission. Our platform
                and educational content are open for community contributions.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Global Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Quality Bitcoin education should be accessible to developers worldwide,
                regardless of location, background, or economic status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet the Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Passionate Bitcoin developers and educators building the future of blockchain education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">BDA</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Core Team</h3>
              <p className="text-primary font-medium mb-3">Bitcoin Developers & Educators</p>
              <p className="text-gray-600 leading-relaxed">
                A collective of experienced Bitcoin developers, smart contract engineers,
                and educational specialists dedicated to advancing Bitcoin development education.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-secondary to-bitcoin rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Community Contributors</h3>
              <p className="text-primary font-medium mb-3">Open Source Collaborators</p>
              <p className="text-gray-600 leading-relaxed">
                Talented developers from the Stacks and Bitcoin communities who contribute
                tutorials, code reviews, and educational content to the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-bitcoin to-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Advisory Board</h3>
              <p className="text-primary font-medium mb-3">Industry Experts</p>
              <p className="text-gray-600 leading-relaxed">
                Seasoned professionals from leading Bitcoin companies and educational institutions
                who guide our curriculum and strategic direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Platform Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Building a global community of skilled Bitcoin developers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Active Learners</div>
              <div className="text-gray-500 text-sm">Developers building skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Interactive Tutorials</div>
              <div className="text-gray-500 text-sm">Hands-on exercises</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-gray-600">Certificates Issued</div>
              <div className="text-gray-500 text-sm">Verified on-chain</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Global Access</div>
              <div className="text-gray-500 text-sm">Always available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-custom-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Bitcoin Development Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of developers who are already building the future of finance with Bitcoin and Stacks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/tutorials" className="btn-primary py-4 px-8 text-lg font-semibold">
              Start Learning Today
            </Link>
            <Link href="/community" className="btn-secondary py-4 px-8 text-lg font-semibold">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
