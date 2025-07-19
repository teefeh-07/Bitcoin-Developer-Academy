'use client'

import { useState, useEffect, useRef } from 'react'
import {
  connectWallet,
  disconnectWallet,
  isUserSignedIn,
  getUserData,
  getUserAddress,
  getBNSName,
  getCurrentNetwork,
  switchNetwork,
  getConnectedWalletType,
  SUPPORTED_WALLETS,
  formatAddress
} from '@/lib/wallet'

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState<string | null>(null)
  const [bnsName, setBnsName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showWalletSelector, setShowWalletSelector] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState<'testnet' | 'mainnet'>('testnet')
  const [walletType, setWalletType] = useState<string>('unknown')
  const popupRef = useRef<HTMLDivElement>(null)
  const selectorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkConnection = async () => {
      const connected = isUserSignedIn()
      setIsConnected(connected)

      if (connected) {
        const address = getUserAddress()
        setUserAddress(address || null)
        setCurrentNetwork(getCurrentNetwork())
        setWalletType(getConnectedWalletType())

        // Load BNS name if available
        if (address) {
          try {
            const name = await getBNSName(address)
            setBnsName(name)
          } catch (error) {
            console.error('Error loading BNS name:', error)
          }
        }
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
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setShowWalletSelector(false)
      }
    }

    if (showPopup || showWalletSelector) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPopup, showWalletSelector])

  const handleConnect = async (walletType?: string) => {
    setIsLoading(true)
    setShowWalletSelector(false)
    try {
      connectWallet(walletType)
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
    setBnsName(null)
    setShowPopup(false)
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const toggleWalletSelector = () => {
    setShowWalletSelector(!showWalletSelector)
  }

  const handleNetworkSwitch = (network: 'testnet' | 'mainnet') => {
    switchNetwork(network)
    setCurrentNetwork(network)
  }

  const getDisplayName = () => {
    if (bnsName) return bnsName
    if (userAddress) return formatAddress(userAddress, 6)
    return 'Unknown'
  }

  if (isConnected && userAddress) {
    return (
      <div className="relative">
        <button
          onClick={togglePopup}
          className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{getDisplayName()}</span>
        </button>

        {showPopup && (
          <div
            ref={popupRef}
            className="absolute right-0 top-full mt-2 w-80 bg-custom-purple rounded-lg shadow-lg border border-gray-200 z-50"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Connected</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {walletType}
                </span>
              </div>

              {bnsName && (
                <div className="mb-3">
                  <label className="text-xs text-gray-500 uppercase tracking-wide">BNS Name</label>
                  <div className="mt-1 p-2 bg-blue-50 rounded text-sm font-medium text-blue-700 border border-blue-200">
                    {bnsName}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="text-xs text-gray-500 uppercase tracking-wide">Wallet Address</label>
                <div className="mt-1 p-2 bg-white/80 rounded text-sm font-mono text-gray-700 break-all border border-gray-200">
                  {userAddress}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-gray-500 uppercase tracking-wide">Network</label>
                <div className="mt-1 flex space-x-2">
                  <button
                    onClick={() => handleNetworkSwitch('testnet')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      currentNetwork === 'testnet'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Testnet
                  </button>
                  <button
                    onClick={() => handleNetworkSwitch('mainnet')}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      currentNetwork === 'mainnet'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Mainnet
                  </button>
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
    <div className="relative">
      <button
        onClick={toggleWalletSelector}
        disabled={isLoading}
        className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {showWalletSelector && (
        <div
          ref={selectorRef}
          className="absolute right-0 top-full mt-2 w-64 bg-custom-purple rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose Wallet</h3>

            <div className="space-y-2">
              <button
                onClick={() => handleConnect('hiro')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">H</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Hiro Wallet</div>
                  <div className="text-xs text-gray-500">Browser extension</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect('xverse')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">X</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Xverse</div>
                  <div className="text-xs text-gray-500">Mobile & browser</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect('leather')}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">L</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Leather</div>
                  <div className="text-xs text-gray-500">Browser extension</div>
                </div>
              </button>

              <button
                onClick={() => handleConnect()}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left border-t border-gray-200 mt-2 pt-3"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">?</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Other</div>
                  <div className="text-xs text-gray-500">Auto-detect wallet</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
