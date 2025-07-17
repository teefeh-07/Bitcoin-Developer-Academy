# Hello Clarity

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

```clarity
(define-public (hello-world)
  (ok "Hello, Bitcoin!"))
```

This function:
- Uses `define-public` to create a public function anyone can call
- Returns `(ok "Hello, Bitcoin!")` - the `ok` indicates success
- Takes no parameters (empty parentheses)

[Code Editor]

## Understanding the Syntax

Clarity uses a LISP-like syntax with prefix notation:
- Functions are called with `(function-name arg1 arg2)`
- Everything is wrapped in parentheses
- The function name comes first, followed by arguments

## Response Types

Clarity functions return Response types that can be either:
- `(ok value)` - indicates success with a value
- `(err error)` - indicates an error occurred

This makes error handling explicit and predictable.

## Try It Yourself

In the code editor, try modifying the hello-world function:

1. Change the message to something personal
2. Try creating a new function called `get-number` that returns `(ok u42)`
3. Create a function that takes a name parameter: `(define-public (greet (name (string-ascii 50))) (ok (concat "Hello, " name)))`

## Data Types

Clarity has several built-in data types:
- `uint` - unsigned integers (u1, u42, u1000)
- `int` - signed integers (1, -42, 1000)  
- `bool` - booleans (true, false)
- `string-ascii` - ASCII strings
- `string-utf8` - UTF-8 strings
- `principal` - Stacks addresses

## Next Steps

Great job! You've written your first Clarity function. In the next lesson, we'll learn about:
- Data variables and maps
- More complex functions
- Deploying contracts to testnet

Click "Next Step" to continue your journey!
