'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import WalletConnect from '@/components/WalletConnect'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-custom-purple border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/BDA.png"
                  alt="Bitcoin Developer Academy Logo"
                  width={108}
                  height={108}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/tutorials" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Tutorials
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-primary transition-colors font-medium">
              About
            </Link>
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <WalletConnect />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-300 bg-custom-purple">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/tutorials"
                className="block text-gray-600 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tutorials
              </Link>
              <Link
                href="/dashboard"
                className="block text-gray-600 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="block text-gray-600 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
