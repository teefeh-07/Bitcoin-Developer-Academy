# Your First DApp

Welcome to the second tutorial in our Bitcoin Developer Academy series! Now that you understand Clarity basics, let's build a complete decentralized application (DApp) with both smart contract and frontend components.

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

```clarity
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
```

This sets up:
- A constant for the contract owner (whoever deploys the contract)
- Error constants for better error handling
- A data variable to store our counter value
- A read-only function to retrieve the counter

[Code Editor]

### Increment Function

Now let's add a function to increment the counter:

```clarity
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))
```

This function:
- Uses `begin` to execute multiple statements
- Gets the current counter value with `var-get`
- Adds 1 using the `+` function
- Sets the new value with `var-set`
- Returns the new counter value wrapped in `ok`

### Decrement Function

Let's add a decrement function with validation:

```clarity
(define-public (decrement)
  (let ((current-value (var-get counter)))
    (if (> current-value u0)
        (begin
          (var-set counter (- current-value u1))
          (ok (var-get counter)))
        (err err-invalid-value))))
```

This function:
- Uses `let` to bind the current value to a variable
- Checks if the counter is greater than 0
- Only decrements if the value is positive
- Returns an error if trying to go below 0

### Admin Reset Function

Finally, let's add an admin-only reset function:

```clarity
(define-public (reset)
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set counter u0)
    (ok u0)))
```

This function:
- Uses `asserts!` to check if the caller is the contract owner
- Resets the counter to 0 if authorized
- Returns an error if called by non-owner

## Complete Smart Contract

Here's our complete counter contract:

```clarity
;; Counter DApp Smart Contract

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-invalid-value (err u101))

;; Data Variables
(define-data-var counter uint u0)

;; Read-only Functions
(define-read-only (get-counter)
  (var-get counter))

(define-read-only (get-owner)
  contract-owner)

;; Public Functions
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

(define-public (decrement)
  (let ((current-value (var-get counter)))
    (if (> current-value u0)
        (begin
          (var-set counter (- current-value u1))
          (ok (var-get counter)))
        (err err-invalid-value))))

(define-public (reset)
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set counter u0)
    (ok u0)))
```

[Code Editor]

## Testing Your Contract

Before building the frontend, let's test our contract using Clarinet:

```bash
# Test the increment function
(contract-call? .counter increment)

# Test the decrement function
(contract-call? .counter decrement)

# Test getting the counter value
(contract-call? .counter get-counter)

# Test reset (should work for contract owner)
(contract-call? .counter reset)
```

## Frontend Development

Now let's build a React frontend to interact with our smart contract.

### Setting Up Stacks.js

First, install the necessary dependencies:

```bash
npm install @stacks/connect @stacks/transactions @stacks/network
```

### Wallet Connection

Create a component to handle wallet connection:

```javascript
import { showConnect } from '@stacks/connect';
import { StacksTestnet } from '@stacks/network';

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
    userSession,
  });
};
```

### Reading Contract Data

To read the counter value:

```javascript
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';

const getCounter = async () => {
  const result = await callReadOnlyFunction({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'counter',
    functionName: 'get-counter',
    functionArgs: [],
    network: new StacksTestnet(),
  });
  
  return cvToValue(result);
};
```

### Writing to the Contract

To increment the counter:

```javascript
import { openContractCall } from '@stacks/connect';
import { uintCV } from '@stacks/transactions';

const incrementCounter = () => {
  openContractCall({
    contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
    contractName: 'counter',
    functionName: 'increment',
    functionArgs: [],
    network: new StacksTestnet(),
    onFinish: (data) => {
      console.log('Transaction ID:', data.txId);
    },
  });
};
```

## Complete React Component

Here's a complete React component for our counter DApp:

```javascript
import React, { useState, useEffect } from 'react';
import { showConnect, openContractCall } from '@stacks/connect';
import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';

const CounterDApp = () => {
  const [counter, setCounter] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  const network = new StacksTestnet();
  const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const contractName = 'counter';

  // Load counter value
  const loadCounter = async () => {
    try {
      const result = await callReadOnlyFunction({
        contractAddress,
        contractName,
        functionName: 'get-counter',
        functionArgs: [],
        network,
      });
      setCounter(cvToValue(result));
    } catch (error) {
      console.error('Error loading counter:', error);
    }
  };

  // Connect wallet
  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Counter DApp',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        setIsConnected(true);
        loadCounter();
      },
    });
  };

  // Contract call helper
  const callContract = (functionName) => {
    setLoading(true);
    openContractCall({
      contractAddress,
      contractName,
      functionName,
      functionArgs: [],
      network,
      onFinish: (data) => {
        console.log('Transaction ID:', data.txId);
        setLoading(false);
        // Reload counter after transaction
        setTimeout(loadCounter, 5000);
      },
    });
  };

  useEffect(() => {
    loadCounter();
  }, []);

  return (
    <div className="counter-dapp">
      <h1>Counter DApp</h1>
      
      <div className="counter-display">
        <h2>Current Count: {counter}</h2>
      </div>

      {!isConnected ? (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <div className="controls">
          <button 
            onClick={() => callContract('increment')}
            disabled={loading}
          >
            Increment (+1)
          </button>
          
          <button 
            onClick={() => callContract('decrement')}
            disabled={loading}
          >
            Decrement (-1)
          </button>
          
          <button 
            onClick={() => callContract('reset')}
            disabled={loading}
          >
            Reset (Admin Only)
          </button>
        </div>
      )}

      {loading && <p>Transaction in progress...</p>}
    </div>
  );
};

export default CounterDApp;
```

## Deployment Guide

### 1. Deploy Smart Contract

Use Clarinet to deploy to testnet:

```bash
clarinet deploy --testnet
```

### 2. Update Frontend Configuration

Update your frontend with the deployed contract address:

```javascript
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
```

### 3. Test Your DApp

1. Connect your Stacks wallet
2. Try incrementing and decrementing the counter
3. Verify transactions on the Stacks Explorer
4. Test the admin reset function

## Key Concepts Learned

In this tutorial, you learned:

1. **State Management**: Using data variables to store contract state
2. **Access Control**: Implementing owner-only functions with assertions
3. **Error Handling**: Using error constants and proper error responses
4. **Frontend Integration**: Connecting React to Stacks smart contracts
5. **Transaction Handling**: Managing user transactions and feedback
6. **Testing**: Using Clarinet for contract testing

## Next Steps

Congratulations! You've built your first complete DApp. In the next tutorial, we'll explore:
- NFT creation and management
- More complex data structures
- Advanced frontend patterns
- Production deployment strategies

Ready to continue? Let's build some NFTs!

[Next: NFTs on Stacks →]
