import fs from 'fs'
import path from 'path'

// Function to load tutorial content from markdown files
export const getTutorialContent = async (id: string): Promise<string> => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'tutorials', `${id}.md`)
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Tutorial file not found: ${filePath}`)
      return getDefaultContent(id)
    }
    
    const content = fs.readFileSync(filePath, 'utf8')
    return content
  } catch (error) {
    console.error(`Error loading tutorial content for ${id}:`, error)
    return getDefaultContent(id)
  }
}

// Fallback content for tutorials
const getDefaultContent = (id: string): string => {
  switch (id) {
    case 'hello-clarity':
      return `# Hello Clarity

Welcome to your first Clarity smart contract tutorial! In this lesson, you'll learn the basics of the Clarity language and deploy your first contract to the Stacks testnet.

## What is Clarity?

Clarity is a decidable smart contract language that optimizes for predictability and security. Unlike other smart contract languages, Clarity is interpreted (not compiled) and the complete program is published on-chain.

Key features of Clarity:
- **Decidable**: You can know with certainty what a program will do
- **Interpreted**: No compilation step, source code is published on-chain  
- **Non-Turing complete**: Prevents infinite loops and makes programs predictable
- **Secure by design**: Built-in protections against common vulnerabilities

## Your First Function

Let's start with the classic "Hello World" example. In Clarity, we'll create a simple function that returns a greeting.

\`\`\`clarity
(define-public (hello-world)
  (ok "Hello, Bitcoin!"))
\`\`\`

This function:
- Uses \`define-public\` to create a public function anyone can call
- Returns \`(ok "Hello, Bitcoin!")\` - the \`ok\` indicates success
- Takes no parameters (empty parentheses)

[Code Editor]

## Understanding the Syntax

Clarity uses a LISP-like syntax with prefix notation:
- Functions are called with \`(function-name arg1 arg2)\`
- Everything is wrapped in parentheses
- The function name comes first, followed by arguments

## Response Types

Clarity functions return Response types that can be either:
- \`(ok value)\` - indicates success with a value
- \`(err error)\` - indicates an error occurred

This makes error handling explicit and predictable.

## Try It Yourself

In the code editor, try modifying the hello-world function:

1. Change the message to something personal
2. Try creating a new function called \`get-number\` that returns \`(ok u42)\`
3. Create a function that takes a name parameter

## Data Types

Clarity has several built-in data types:
- \`uint\` - unsigned integers (u1, u42, u1000)
- \`int\` - signed integers (1, -42, 1000)  
- \`bool\` - booleans (true, false)
- \`string-ascii\` - ASCII strings
- \`string-utf8\` - UTF-8 strings
- \`principal\` - Stacks addresses

## Working with Variables

Let's create a simple counter contract:

\`\`\`clarity
(define-data-var counter uint u0)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

(define-read-only (get-counter)
  (var-get counter))
\`\`\`

## Next Steps

Great job! You've written your first Clarity function. In the next lesson, we'll learn about:
- Data variables and maps
- More complex functions
- Deploying contracts to testnet

Click "Next Step" to continue your journey!`

    case 'your-first-dapp':
      return `# Your First DApp

Welcome to the second tutorial! Now that you understand Clarity basics, let's build a complete decentralized application (DApp) with both smart contract and frontend components.

## What We'll Build

In this tutorial, we'll create a simple counter DApp that allows users to:
- View the current counter value
- Increment the counter
- Decrement the counter
- Reset the counter (admin only)

This will teach you:
- State management in smart contracts
- Access control patterns
- Frontend integration with Stacks.js
- Transaction handling and user feedback

## Smart Contract Development

### Setting Up State

First, let's create a smart contract that maintains state using data variables:

\`\`\`clarity
;; Define the contract owner
(define-constant contract-owner tx-sender)

;; Define error constants
(define-constant err-owner-only (err u100))
(define-constant err-invalid-value (err u101))

;; Define the counter variable
(define-data-var counter uint u0)

;; Define read-only function to get counter
(define-read-only (get-counter)
  (var-get counter))
\`\`\`

[Code Editor]

## Frontend Integration

Now let's build a React frontend to interact with our smart contract using Stacks.js.

### Wallet Connection

\`\`\`javascript
import { showConnect } from '@stacks/connect';

const connectWallet = () => {
  showConnect({
    appDetails: {
      name: 'Counter DApp',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
  });
};
\`\`\`

## Key Concepts Learned

In this tutorial, you learned:
1. **State Management**: Using data variables to store contract state
2. **Access Control**: Implementing owner-only functions with assertions
3. **Frontend Integration**: Connecting React to Stacks smart contracts
4. **Transaction Handling**: Managing user transactions and feedback

## Next Steps

Congratulations! You've built your first complete DApp. Ready for NFTs?`

    case 'nfts-on-stacks':
      return `# NFTs on Stacks

Welcome to the advanced tutorial! In this tutorial, you'll learn how to create, mint, and trade Non-Fungible Tokens (NFTs) on the Stacks blockchain using the SIP-009 standard.

## What We'll Build

We'll create a complete NFT project including:
- A SIP-009 compliant NFT smart contract
- Minting functionality with metadata
- A simple marketplace for trading
- Frontend integration for minting and viewing NFTs

## Understanding SIP-009

SIP-009 is the standard for Non-Fungible Tokens on Stacks. It defines the interface that all NFT contracts should implement.

## Basic NFT Contract

Let's start with a basic NFT contract:

\`\`\`clarity
;; Bitcoin Art NFT Contract

;; Implement SIP-009 trait
(impl-trait .nft-trait.nft-trait)

;; Define the NFT
(define-non-fungible-token bitcoin-art uint)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-token-not-found (err u102))

;; Variables
(define-data-var last-token-id uint u0)
\`\`\`

[Code Editor]

## Marketplace Functionality

### Listing for Sale

\`\`\`clarity
(define-map listings uint {
  seller: principal,
  price: uint,
  active: bool
})

(define-public (list-for-sale (token-id uint) (price uint))
  (let ((owner (unwrap! (nft-get-owner? bitcoin-art token-id) err-token-not-found)))
    (begin
      (asserts! (is-eq tx-sender owner) err-not-token-owner)
      (asserts! (> price u0) (err u103))
      (map-set listings token-id {
        seller: tx-sender,
        price: price,
        active: true
      })
      (ok true))))
\`\`\`

## Key Concepts Learned

In this tutorial, you mastered:
1. **SIP-009 Standard**: Implementing the NFT standard for Stacks
2. **Metadata Management**: Storing and retrieving NFT metadata
3. **IPFS Integration**: Decentralized storage for images and metadata
4. **Marketplace Mechanics**: Listing, purchasing, and trading NFTs

## Next Steps

Congratulations! You've built a complete NFT ecosystem. You've completed the Bitcoin Developer Academy core curriculum! 🎉

[Claim Your Certificate →]`

    default:
      return `# Tutorial Not Found

Sorry, the tutorial content for "${id}" could not be loaded. Please check back later or contact support.

## Available Tutorials

- [Hello Clarity](/tutorials/hello-clarity)
- [Your First DApp](/tutorials/your-first-dapp)
- [NFTs on Stacks](/tutorials/nfts-on-stacks)

[Back to Tutorials](/tutorials)`
  }
}

// Client-side version for browser environments
export const getTutorialContentClient = (id: string): string => {
  return getDefaultContent(id)
}
