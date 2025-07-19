import { 
  callReadOnlyFunction, 
  cvToValue, 
  standardPrincipalCV,
  uintCV,
  stringAsciiCV,
  contractPrincipalCV
} from '@stacks/transactions'
import { StacksTestnet, StacksMainnet } from '@stacks/network'
import { Certificate, UserProgress } from '@/types'

// Network configuration
const network = process.env.NODE_ENV === 'production' 
  ? new StacksMainnet() 
  : new StacksTestnet()

// Contract addresses (these would be the actual deployed contract addresses)
const CONTRACTS = {
  CERTIFICATE_NFT: {
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Replace with actual address
    name: 'certificate-nft'
  },
  PROGRESS_TRACKER: {
    address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM', // Replace with actual address
    name: 'progress-tracker'
  }
}

// Certificate NFT functions
export const getCertificatesByOwner = async (ownerAddress: string): Promise<Certificate[]> => {
  try {
    // Get the total number of certificates
    const lastTokenIdResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.CERTIFICATE_NFT.address,
      contractName: CONTRACTS.CERTIFICATE_NFT.name,
      functionName: 'get-last-token-id',
      functionArgs: [],
      network,
    })

    const lastTokenId = cvToValue(lastTokenIdResult)
    const certificates: Certificate[] = []

    // Check each token to see if it belongs to the user
    for (let tokenId = 1; tokenId <= lastTokenId; tokenId++) {
      try {
        const ownerResult = await callReadOnlyFunction({
          contractAddress: CONTRACTS.CERTIFICATE_NFT.address,
          contractName: CONTRACTS.CERTIFICATE_NFT.name,
          functionName: 'get-owner',
          functionArgs: [uintCV(tokenId)],
          network,
        })

        const owner = cvToValue(ownerResult)
        
        if (owner && owner === ownerAddress) {
          // Get certificate metadata
          const metadataResult = await callReadOnlyFunction({
            contractAddress: CONTRACTS.CERTIFICATE_NFT.address,
            contractName: CONTRACTS.CERTIFICATE_NFT.name,
            functionName: 'get-certificate-metadata',
            functionArgs: [uintCV(tokenId)],
            network,
          })

          const metadata = cvToValue(metadataResult)
          
          if (metadata) {
            certificates.push({
              tokenId,
              courseId: metadata.courseId,
              courseName: metadata.courseName,
              recipient: ownerAddress,
              completionDate: new Date(metadata.completionDate * 1000), // Convert from timestamp
              skillLevel: metadata.skillLevel,
              ipfsMetadata: metadata.ipfsMetadata,
              transactionId: metadata.transactionId
            })
          }
        }
      } catch (error) {
        console.error(`Error checking token ${tokenId}:`, error)
        // Continue with next token
      }
    }

    return certificates
  } catch (error) {
    console.error('Error fetching certificates:', error)
    return []
  }
}

export const getCertificateById = async (tokenId: number): Promise<Certificate | null> => {
  try {
    // Get owner
    const ownerResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.CERTIFICATE_NFT.address,
      contractName: CONTRACTS.CERTIFICATE_NFT.name,
      functionName: 'get-owner',
      functionArgs: [uintCV(tokenId)],
      network,
    })

    const owner = cvToValue(ownerResult)
    
    if (!owner) {
      return null
    }

    // Get metadata
    const metadataResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.CERTIFICATE_NFT.address,
      contractName: CONTRACTS.CERTIFICATE_NFT.name,
      functionName: 'get-certificate-metadata',
      functionArgs: [uintCV(tokenId)],
      network,
    })

    const metadata = cvToValue(metadataResult)
    
    if (!metadata) {
      return null
    }

    return {
      tokenId,
      courseId: metadata.courseId,
      courseName: metadata.courseName,
      recipient: owner,
      completionDate: new Date(metadata.completionDate * 1000),
      skillLevel: metadata.skillLevel,
      ipfsMetadata: metadata.ipfsMetadata,
      transactionId: metadata.transactionId
    }
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return null
  }
}

// Progress tracking functions
export const getUserProgress = async (userAddress: string): Promise<UserProgress | null> => {
  try {
    const progressResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.PROGRESS_TRACKER.address,
      contractName: CONTRACTS.PROGRESS_TRACKER.name,
      functionName: 'get-user-progress',
      functionArgs: [standardPrincipalCV(userAddress)],
      network,
    })

    const progress = cvToValue(progressResult)
    
    if (!progress) {
      // Return default progress for new users
      return {
        completedModules: [],
        currentCourse: 0,
        totalPoints: 0,
        currentStreak: 0,
        lastActivity: new Date(),
        skillLevel: 0,
        totalTimeSpent: 0
      }
    }

    return {
      completedModules: progress.completedModules || [],
      currentCourse: progress.currentCourse || 0,
      totalPoints: progress.totalPoints || 0,
      currentStreak: progress.currentStreak || 0,
      lastActivity: progress.lastActivity ? new Date(progress.lastActivity * 1000) : new Date(),
      skillLevel: progress.skillLevel || 0,
      totalTimeSpent: progress.totalTimeSpent || 0
    }
  } catch (error) {
    console.error('Error fetching user progress:', error)
    // Return default progress on error
    return {
      completedModules: [],
      currentCourse: 0,
      totalPoints: 0,
      currentStreak: 0,
      lastActivity: new Date(),
      skillLevel: 0,
      totalTimeSpent: 0
    }
  }
}

export const getTutorialProgress = async (userAddress: string, tutorialId: string): Promise<any> => {
  try {
    const progressResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.PROGRESS_TRACKER.address,
      contractName: CONTRACTS.PROGRESS_TRACKER.name,
      functionName: 'get-tutorial-progress',
      functionArgs: [
        standardPrincipalCV(userAddress),
        stringAsciiCV(tutorialId)
      ],
      network,
    })

    return cvToValue(progressResult)
  } catch (error) {
    console.error('Error fetching tutorial progress:', error)
    return null
  }
}

// Verification functions
export const verifyCertificate = async (tokenId: number): Promise<boolean> => {
  try {
    const ownerResult = await callReadOnlyFunction({
      contractAddress: CONTRACTS.CERTIFICATE_NFT.address,
      contractName: CONTRACTS.CERTIFICATE_NFT.name,
      functionName: 'get-owner',
      functionArgs: [uintCV(tokenId)],
      network,
    })

    const owner = cvToValue(ownerResult)
    return owner !== null
  } catch (error) {
    console.error('Error verifying certificate:', error)
    return false
  }
}

// Helper functions
export const formatAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 8)}...${address.slice(-8)}`
}

export const getNetworkName = (): string => {
  return process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet'
}

export const getExplorerUrl = (txId: string): string => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://explorer.stacks.co'
    : 'https://explorer.stacks.co/?chain=testnet'
  return `${baseUrl}/txid/${txId}`
}

// Mock data fallback for development
export const getMockCertificates = (): Certificate[] => [
  {
    tokenId: 1,
    courseId: 1,
    courseName: 'Hello Clarity',
    recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    completionDate: new Date('2024-01-15'),
    skillLevel: 1,
    ipfsMetadata: 'QmHash123456789',
    transactionId: '0x1234567890abcdef1234567890abcdef12345678'
  },
  {
    tokenId: 2,
    courseId: 2,
    courseName: 'Your First DApp',
    recipient: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    completionDate: new Date('2024-01-20'),
    skillLevel: 2,
    ipfsMetadata: 'QmHash987654321',
    transactionId: '0xabcdef1234567890abcdef1234567890abcdef12'
  }
]

export const getMockProgress = (): UserProgress => ({
  completedModules: [1, 2, 3],
  currentCourse: 2,
  totalPoints: 250,
  currentStreak: 7,
  lastActivity: new Date(),
  skillLevel: 2,
  totalTimeSpent: 320
})
