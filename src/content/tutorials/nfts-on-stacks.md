# NFTs on Stacks

Welcome to the third tutorial in our Bitcoin Developer Academy series! In this advanced tutorial, you'll learn how to create, mint, and trade Non-Fungible Tokens (NFTs) on the Stacks blockchain using the SIP-009 standard.

## What We'll Build

We'll create a complete NFT project including:
- A SIP-009 compliant NFT smart contract
- Minting functionality with metadata
- A simple marketplace for trading
- Frontend integration for minting and viewing NFTs

This will teach you:
- The SIP-009 NFT standard
- IPFS integration for metadata
- Marketplace mechanics
- Advanced Clarity patterns

## Understanding SIP-009

SIP-009 is the standard for Non-Fungible Tokens on Stacks. It defines the interface that all NFT contracts should implement:

```clarity
;; SIP-009 trait definition
(define-trait nft-trait
  (
    ;; Last token ID, limited to uint range
    (get-last-token-id () (response uint uint))
    
    ;; URI for metadata associated with the token
    (get-token-uri (uint) (response (optional (string-ascii 256)) uint))
    
    ;; Owner of a given token identifier
    (get-owner (uint) (response (optional principal) uint))
    
    ;; Transfer from the sender to a new principal
    (transfer (uint principal principal) (response bool uint))
  )
)
```

## Basic NFT Contract

Let's start with a basic NFT contract:

```clarity
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
(define-data-var base-uri (string-ascii 256) "https://ipfs.io/ipfs/")

;; Maps
(define-map token-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  image-hash: (string-ascii 64)
})
```

[Code Editor]

## Core NFT Functions

### Get Last Token ID

```clarity
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id)))
```

### Get Token URI

```clarity
(define-read-only (get-token-uri (token-id uint))
  (let ((metadata (map-get? token-metadata token-id)))
    (if (is-some metadata)
        (ok (some (concat (var-get base-uri) 
                         (get image-hash (unwrap-panic metadata)))))
        (ok none))))
```

### Get Owner

```clarity
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? bitcoin-art token-id)))
```

### Transfer Function

```clarity
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (asserts! (is-some (nft-get-owner? bitcoin-art token-id)) err-token-not-found)
    (nft-transfer? bitcoin-art token-id sender recipient)))
```

## Minting Functionality

### Mint Function

```clarity
(define-public (mint (recipient principal) 
                    (name (string-ascii 64))
                    (description (string-ascii 256))
                    (image-hash (string-ascii 64)))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (begin
      (asserts! (is-eq tx-sender contract-owner) err-owner-only)
      (try! (nft-mint? bitcoin-art token-id recipient))
      (map-set token-metadata token-id {
        name: name,
        description: description,
        image-hash: image-hash
      })
      (var-set last-token-id token-id)
      (ok token-id))))
```

### Batch Minting

```clarity
(define-public (batch-mint (recipients (list 100 principal))
                          (names (list 100 (string-ascii 64)))
                          (descriptions (list 100 (string-ascii 256)))
                          (image-hashes (list 100 (string-ascii 64))))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (map mint-helper 
             recipients 
             names 
             descriptions 
             image-hashes))))

(define-private (mint-helper (recipient principal)
                           (name (string-ascii 64))
                           (description (string-ascii 256))
                           (image-hash (string-ascii 64)))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (begin
      (unwrap-panic (nft-mint? bitcoin-art token-id recipient))
      (map-set token-metadata token-id {
        name: name,
        description: description,
        image-hash: image-hash
      })
      (var-set last-token-id token-id)
      token-id)))
```

## Marketplace Functionality

### Listing for Sale

```clarity
;; Marketplace maps
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
```

### Purchase Function

```clarity
(define-public (purchase (token-id uint))
  (let ((listing (unwrap! (map-get? listings token-id) err-token-not-found))
        (seller (get seller listing))
        (price (get price listing)))
    (begin
      (asserts! (get active listing) (err u104))
      (asserts! (not (is-eq tx-sender seller)) (err u105))
      (try! (stx-transfer? price tx-sender seller))
      (try! (nft-transfer? bitcoin-art token-id seller tx-sender))
      (map-delete listings token-id)
      (ok true))))
```

### Cancel Listing

```clarity
(define-public (cancel-listing (token-id uint))
  (let ((listing (unwrap! (map-get? listings token-id) err-token-not-found)))
    (begin
      (asserts! (is-eq tx-sender (get seller listing)) err-not-token-owner)
      (map-delete listings token-id)
      (ok true))))
```

## Complete NFT Contract

Here's our complete NFT contract with marketplace:

```clarity
;; Bitcoin Art NFT with Marketplace

(impl-trait .nft-trait.nft-trait)
(define-non-fungible-token bitcoin-art uint)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-token-not-found (err u102))
(define-constant err-invalid-price (err u103))
(define-constant err-listing-not-active (err u104))
(define-constant err-cannot-buy-own-nft (err u105))

;; Variables
(define-data-var last-token-id uint u0)
(define-data-var base-uri (string-ascii 256) "https://ipfs.io/ipfs/")

;; Maps
(define-map token-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  image-hash: (string-ascii 64)
})

(define-map listings uint {
  seller: principal,
  price: uint,
  active: bool
})

;; SIP-009 Functions
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id)))

(define-read-only (get-token-uri (token-id uint))
  (let ((metadata (map-get? token-metadata token-id)))
    (if (is-some metadata)
        (ok (some (concat (var-get base-uri) 
                         (get image-hash (unwrap-panic metadata)))))
        (ok none))))

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? bitcoin-art token-id)))

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (asserts! (is-some (nft-get-owner? bitcoin-art token-id)) err-token-not-found)
    (nft-transfer? bitcoin-art token-id sender recipient)))

;; Minting Functions
(define-public (mint (recipient principal) 
                    (name (string-ascii 64))
                    (description (string-ascii 256))
                    (image-hash (string-ascii 64)))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (begin
      (asserts! (is-eq tx-sender contract-owner) err-owner-only)
      (try! (nft-mint? bitcoin-art token-id recipient))
      (map-set token-metadata token-id {
        name: name,
        description: description,
        image-hash: image-hash
      })
      (var-set last-token-id token-id)
      (ok token-id))))

;; Marketplace Functions
(define-public (list-for-sale (token-id uint) (price uint))
  (let ((owner (unwrap! (nft-get-owner? bitcoin-art token-id) err-token-not-found)))
    (begin
      (asserts! (is-eq tx-sender owner) err-not-token-owner)
      (asserts! (> price u0) err-invalid-price)
      (map-set listings token-id {
        seller: tx-sender,
        price: price,
        active: true
      })
      (ok true))))

(define-public (purchase (token-id uint))
  (let ((listing (unwrap! (map-get? listings token-id) err-token-not-found))
        (seller (get seller listing))
        (price (get price listing)))
    (begin
      (asserts! (get active listing) err-listing-not-active)
      (asserts! (not (is-eq tx-sender seller)) err-cannot-buy-own-nft)
      (try! (stx-transfer? price tx-sender seller))
      (try! (nft-transfer? bitcoin-art token-id seller tx-sender))
      (map-delete listings token-id)
      (ok true))))

;; Read-only helper functions
(define-read-only (get-token-metadata (token-id uint))
  (map-get? token-metadata token-id))

(define-read-only (get-listing (token-id uint))
  (map-get? listings token-id))
```

[Code Editor]

## IPFS Integration

### Metadata Structure

NFT metadata should follow this JSON structure:

```json
{
  "name": "Bitcoin Art #1",
  "description": "A beautiful piece of Bitcoin-inspired digital art",
  "image": "https://ipfs.io/ipfs/QmYourImageHash",
  "attributes": [
    {
      "trait_type": "Color",
      "value": "Orange"
    },
    {
      "trait_type": "Rarity",
      "value": "Rare"
    }
  ]
}
```

### Uploading to IPFS

Use a service like Pinata or IPFS directly:

```javascript
const uploadToIPFS = async (file, metadata) => {
  // Upload image first
  const imageFormData = new FormData();
  imageFormData.append('file', file);
  
  const imageResponse = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`,
    },
    body: imageFormData,
  });
  
  const imageResult = await imageResponse.json();
  
  // Update metadata with image hash
  metadata.image = `https://ipfs.io/ipfs/${imageResult.IpfsHash}`;
  
  // Upload metadata
  const metadataResponse = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PINATA_JWT}`,
    },
    body: JSON.stringify(metadata),
  });
  
  const metadataResult = await metadataResponse.json();
  return metadataResult.IpfsHash;
};
```

## Frontend Integration

### NFT Gallery Component

```javascript
import React, { useState, useEffect } from 'react';
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';

const NFTGallery = ({ contractAddress, contractName }) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNFTs = async () => {
    try {
      // Get total supply
      const lastTokenId = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-last-token-id',
        functionArgs: [],
        network: new StacksTestnet(),
      });
      
      const totalSupply = cvToValue(lastTokenId);
      
      // Load each NFT
      const nftPromises = [];
      for (let i = 1; i <= totalSupply; i++) {
        nftPromises.push(loadNFTData(i));
      }
      
      const nftData = await Promise.all(nftPromises);
      setNfts(nftData.filter(nft => nft !== null));
      setLoading(false);
    } catch (error) {
      console.error('Error loading NFTs:', error);
      setLoading(false);
    }
  };

  const loadNFTData = async (tokenId) => {
    try {
      // Get owner
      const ownerResult = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-owner',
        functionArgs: [uintCV(tokenId)],
        network: new StacksTestnet(),
      });
      
      // Get metadata
      const metadataResult = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-token-metadata',
        functionArgs: [uintCV(tokenId)],
        network: new StacksTestnet(),
      });
      
      // Get listing info
      const listingResult = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-listing',
        functionArgs: [uintCV(tokenId)],
        network: new StacksTestnet(),
      });
      
      return {
        tokenId,
        owner: cvToValue(ownerResult),
        metadata: cvToValue(metadataResult),
        listing: cvToValue(listingResult),
      };
    } catch (error) {
      console.error(`Error loading NFT ${tokenId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    loadNFTs();
  }, []);

  if (loading) return <div>Loading NFTs...</div>;

  return (
    <div className="nft-gallery">
      <h2>NFT Collection</h2>
      <div className="nft-grid">
        {nfts.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
};

const NFTCard = ({ nft }) => {
  const { tokenId, metadata, listing } = nft;
  
  return (
    <div className="nft-card">
      <img 
        src={`https://ipfs.io/ipfs/${metadata.imageHash}`}
        alt={metadata.name}
      />
      <h3>{metadata.name}</h3>
      <p>{metadata.description}</p>
      
      {listing && listing.active && (
        <div className="listing-info">
          <p>Price: {listing.price / 1000000} STX</p>
          <button onClick={() => purchaseNFT(tokenId)}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};
```

### Minting Interface

```javascript
const MintingInterface = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleMint = async () => {
    try {
      // Upload to IPFS
      const ipfsHash = await uploadToIPFS(formData.image, {
        name: formData.name,
        description: formData.description,
      });
      
      // Mint NFT
      openContractCall({
        contractAddress,
        contractName,
        functionName: 'mint',
        functionArgs: [
          principalCV(userAddress),
          stringAsciiCV(formData.name),
          stringAsciiCV(formData.description),
          stringAsciiCV(ipfsHash),
        ],
        network: new StacksTestnet(),
        onFinish: (data) => {
          console.log('Minted NFT:', data.txId);
        },
      });
    } catch (error) {
      console.error('Minting error:', error);
    }
  };

  return (
    <div className="minting-interface">
      <h2>Mint New NFT</h2>
      <form onSubmit={handleMint}>
        <input
          type="text"
          placeholder="NFT Name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
        />
        <button type="submit">Mint NFT</button>
      </form>
    </div>
  );
};
```

## Advanced Features

### Royalties

```clarity
(define-map royalties uint {
  recipient: principal,
  percentage: uint
})

(define-public (set-royalty (token-id uint) (recipient principal) (percentage uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (<= percentage u1000) (err u106)) ;; Max 10%
    (map-set royalties token-id {recipient: recipient, percentage: percentage})
    (ok true)))
```

### Auction System

```clarity
(define-map auctions uint {
  seller: principal,
  highest-bidder: (optional principal),
  highest-bid: uint,
  end-time: uint,
  active: bool
})

(define-public (create-auction (token-id uint) (starting-price uint) (duration uint))
  (let ((owner (unwrap! (nft-get-owner? bitcoin-art token-id) err-token-not-found)))
    (begin
      (asserts! (is-eq tx-sender owner) err-not-token-owner)
      (map-set auctions token-id {
        seller: tx-sender,
        highest-bidder: none,
        highest-bid: starting-price,
        end-time: (+ block-height duration),
        active: true
      })
      (ok true))))
```

## Key Concepts Learned

In this tutorial, you mastered:

1. **SIP-009 Standard**: Implementing the NFT standard for Stacks
2. **Metadata Management**: Storing and retrieving NFT metadata
3. **IPFS Integration**: Decentralized storage for images and metadata
4. **Marketplace Mechanics**: Listing, purchasing, and trading NFTs
5. **Advanced Patterns**: Royalties, auctions, and batch operations
6. **Frontend Integration**: Building complete NFT applications

## Next Steps

Congratulations! You've built a complete NFT ecosystem. You're now ready to:
- Deploy your NFT collection to mainnet
- Explore advanced DeFi integrations
- Build more complex marketplace features
- Create generative art collections

You've completed the Bitcoin Developer Academy core curriculum! 🎉

[Claim Your Certificate →]
