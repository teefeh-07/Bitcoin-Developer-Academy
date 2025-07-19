import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bitcoin Developer Academy',
  description: 'Learn Bitcoin development through interactive tutorials and earn verifiable credentials on Stacks',
  keywords: ['Bitcoin', 'Stacks', 'Blockchain', 'Development', 'Education', 'Clarity', 'Smart Contracts'],
  authors: [{ name: 'Bitcoin Developer Academy' }],
  openGraph: {
    title: 'Bitcoin Developer Academy',
    description: 'Learn Bitcoin development through interactive tutorials and earn verifiable credentials on Stacks',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Developer Academy',
    description: 'Learn Bitcoin development through interactive tutorials and earn verifiable credentials on Stacks',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-custom-purple">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
