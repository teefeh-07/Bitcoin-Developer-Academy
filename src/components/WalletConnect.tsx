'use client'

import { useState, useEffect, useRef } from 'react'
import { connectWallet, disconnectWallet, isUserSignedIn, getUserData, getUserAddress } from '@/lib/wallet'

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkConnection = () => {
      const connected = isUserSignedIn()
      setIsConnected(connected)

      if (connected) {
        const address = getUserAddress()
        setUserAddress(address || null)
      }
    }

    checkConnection()

    // Listen for authentication events
    const interval = setInterval(checkConnection, 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle clicking outside popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false)
      }
    }

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPopup])

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      connectWallet()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setIsConnected(false)
    setUserAddress(null)
    setShowPopup(false)
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (isConnected && userAddress) {
    return (
      <div className="relative">
        <button
          onClick={togglePopup}
          className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{formatAddress(userAddress)}</span>
        </button>

        {showPopup && (
          <div
            ref={popupRef}
            className="absolute right-0 top-full mt-2 w-64 bg-custom-purple rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900">Connected</span>
              </div>

              <div className="mb-4">
                <label className="text-xs text-gray-500 uppercase tracking-wide">Wallet Address</label>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-700 break-all">
                  {userAddress}
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isLoading}
      className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isLoading ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}
