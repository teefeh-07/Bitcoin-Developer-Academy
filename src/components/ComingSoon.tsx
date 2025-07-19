'use client'

import Link from 'next/link'
import Image from 'next/image'

interface ComingSoonProps {
  title?: string
  description?: string
  features?: string[]
  showBackButton?: boolean
}

export default function ComingSoon({ 
  title = "We're Building Something Amazing",
  description = "This page is currently under development. We're working hard to bring you the best Bitcoin development learning experience.",
  features = [
    "Interactive coding challenges",
    "Advanced Bitcoin development tutorials", 
    "Community features and discussions",
    "Certification and achievement system"
  ],
  showBackButton = false
}: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-custom-purple flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <Image
              src="/BDA.png"
              alt="Bitcoin Developer Academy Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
          Coming Soon
        </div>

        {/* Main Content */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Features Preview */}
        {features.length > 0 && (
          <div className="bg-custom-purple rounded-lg border border-gray-300 p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Coming:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {showBackButton && (
            <Link 
              href="/" 
              className="btn-primary w-full block text-center"
            >
              Back to Home
            </Link>
          )}
          
          <Link 
            href="/tutorials" 
            className="btn-secondary w-full block text-center"
          >
            Explore Available Tutorials
          </Link>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-500 mt-8">
          Want to be notified when this feature launches? Connect your wallet and we'll keep you updated!
        </p>
      </div>
    </div>
  )
}
