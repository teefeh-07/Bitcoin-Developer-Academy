# Bitcoin Developer Academy

> The first decentralized, Bitcoin-native education platform that teaches developers to build on Bitcoin through Stacks, with on-chain credentialing and community-driven curriculum.

[![Stacks](https://img.shields.io/badge/Built%20on-Stacks-5546FF)](https://stacks.co)
[![Bitcoin](https://img.shields.io/badge/Secured%20by-Bitcoin-F7931A)](https://bitcoin.org)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🎯 Vision

Create the definitive learning platform for Bitcoin developers, where students learn by building real applications, earn verifiable on-chain credentials, and contribute to a community-driven curriculum that evolves with the Bitcoin ecosystem.

## 🚀 Unique Value Proposition

- **Learn by Doing**: Interactive tutorials with real smart contract deployment
- **Verifiable Credentials**: NFT certificates stored on Bitcoin's most secure L2
- **Community-Driven**: Curriculum that evolves with ecosystem needs
- **Bitcoin-Native**: First-class integration with Stacks development tools
- **Progressive Learning**: From basics to advanced Bitcoin development

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [MVP Specification](#mvp-specification)
- [Technical Architecture](#technical-architecture)
- [Development Roadmap](#development-roadmap)
- [Smart Contract Architecture](#smart-contract-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Go-to-Market Strategy](#go-to-market-strategy)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## 🎓 Project Overview

### Core Features

1. **Interactive Tutorial System**
   - Step-by-step Clarity smart contract tutorials
   - In-browser code editor with syntax highlighting
   - Real testnet deployment capabilities
   - Progress tracking via smart contracts

2. **Achievement System**
   - NFT certificates for completed modules
   - On-chain skill verification
   - Public developer profiles showing credentials

3. **Content Management**
   - Markdown-based tutorial system
   - Community contribution mechanism
   - Version control for educational content

4. **User Authentication & Profiles**
   - Stacks wallet integration (Hiro, Xverse)
   - BNS integration for developer identities
   - Progress dashboard

## 🏗️ Technical Architecture

```
Frontend (Next.js/React)
├── Tutorial Interface
├── Code Editor (Monaco Editor)
├── Wallet Integration
└── Progress Dashboard

Smart Contracts (Clarity)
├── Certificate NFTs
├── Progress Tracking
├── Community Governance
└── Content Verification

Backend Services
├── Content API
├── Testnet Integration
├── Progress Sync
└── Community Features

Storage
├── IPFS (Tutorial Content)
├── Gaia (User Progress)
└── On-chain (Certificates)
```

## 📊 MVP Specification (Levels 2-3)

### Target Features for Stacks Ascent Program

**Level 2 Requirements:**
- Working testnet deployment
- Basic tutorial creation (blog post content)
- Demo video showing wallet connection + certificate minting
- 10+ commits with consistent development

**Level 3 Requirements:**
- Live MVP on mainnet
- 3 complete tutorial courses
- 3 published blog posts about development journey
- Video pitch demonstrating the platform
- 20+ commits over 60 days

### Initial Course Structure

1. **Course 1**: "Hello Clarity" (basic syntax, functions)
2. **Course 2**: "Your First DApp" (frontend integration)
3. **Course 3**: "NFTs on Stacks" (token standards)

## 🗓️ Development Roadmap

### Phase 1: Foundation (Weeks 1-4) - Level 2 Target

#### Week 1-2: Project Setup & Basic Infrastructure
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up Stacks.js integration
- [ ] Create basic wallet connection functionality
- [ ] Design database schema for user progress
- [ ] Set up development environment with Clarinet

#### Week 3-4: Core Smart Contracts
- [ ] Certificate NFT Contract
- [ ] Progress Tracking Contract
- [ ] Deploy contracts to testnet
- [ ] Write comprehensive tests

### Phase 2: MVP Development (Weeks 5-8) - Level 3 Target

#### Week 5-6: Tutorial System
- [ ] Build markdown-based tutorial renderer
- [ ] Integrate Monaco Editor for code editing
- [ ] Create tutorial progression logic
- [ ] Implement basic course structure

#### Week 7-8: User Experience & Polish
- [ ] Build user dashboard showing progress
- [ ] Implement certificate viewing/sharing
- [ ] Add social features (share achievements)
- [ ] Create landing page with clear value proposition
- [ ] Mobile-responsive design

### Phase 3: Advanced Features (Weeks 9-12) - Level 4 Target

#### Week 9-10: Interactive Development Environment
- [ ] Integrate with Clarinet for local testing
- [ ] Add real-time contract compilation
- [ ] Implement testnet deployment from browser
- [ ] Create debugging tools and error explanations

#### Week 11-12: Community Features
- [ ] Community-contributed tutorial system
- [ ] Peer review mechanism for content
- [ ] Discussion forums for each tutorial
- [ ] Mentor matching system

### Phase 4: Ecosystem Integration (Weeks 13-16) - Level 5 Target

#### Week 13-14: Tool Integration
- [ ] Hiro Platform API integration
- [ ] Stacks Explorer integration for transaction viewing
- [ ] Integration with existing Stacks tools
- [ ] API for other platforms to verify certificates

#### Week 15-16: Advanced Learning Paths
- [ ] Specialized tracks (DeFi, NFTs, Infrastructure)
- [ ] Real-world project assignments
- [ ] Industry partnership content
- [ ] Advanced certification levels

## 🔧 Smart Contract Architecture

### Certificate NFT Contract (`certificate-nft.clar`)

```clarity
(define-non-fungible-token dev-certificate uint)

(define-data-var certificate-counter uint u0)

(define-map certificate-data uint {
  course-id: uint,
  student: principal,
  completion-date: uint,
  skill-level: uint,
  ipfs-metadata: (string-ascii 100)
})

(define-public (mint-certificate (recipient principal) (course-id uint) (metadata (string-ascii 100)))
  (let ((certificate-id (+ (var-get certificate-counter) u1)))
    (try! (nft-mint? dev-certificate certificate-id recipient))
    (map-set certificate-data certificate-id {
      course-id: course-id,
      student: recipient,
      completion-date: block-height,
      skill-level: u1,
      ipfs-metadata: metadata
    })
    (var-set certificate-counter certificate-id)
    (ok certificate-id)))
```

### Progress Tracking Contract (`progress-tracker.clar`)

```clarity
(define-map user-progress principal {
  completed-modules: (list 100 uint),
  current-streak: uint,
  total-points: uint,
  last-activity: uint
})

(define-public (complete-module (module-id uint))
  (let ((current-progress (default-to
    {completed-modules: (list), current-streak: u0, total-points: u0, last-activity: u0}
    (map-get? user-progress tx-sender))))
    (map-set user-progress tx-sender
      (merge current-progress {
        completed-modules: (unwrap! (as-max-len?
          (append (get completed-modules current-progress) module-id) u100)
          (err u1)),
        total-points: (+ (get total-points current-progress) u10),
        last-activity: block-height
      }))
    (ok true)))
```

### Advanced Smart Contracts (Phase 3+)

#### Community Governance Contract

```clarity
;; Community governance for content
(define-map tutorial-proposals uint {
  author: principal,
  title: (string-ascii 100),
  content-hash: (buff 32),
  votes-for: uint,
  votes-against: uint,
  status: (string-ascii 20)
})

;; Reputation system
(define-map user-reputation principal {
  teaching-score: uint,
  learning-score: uint,
  community-contributions: uint
})
```

## 💻 Frontend Architecture

### Key Components

```typescript
// Tutorial Component with Code Editor
interface TutorialProps {
  tutorialId: string;
  content: TutorialContent;
  onComplete: (code: string) => void;
}

// Progress Dashboard
interface ProgressDashboard {
  certificates: Certificate[];
  currentCourse: Course;
  completionRate: number;
  streak: number;
}

// Certificate Display
interface CertificateCard {
  tokenId: number;
  courseName: string;
  completionDate: Date;
  skillLevel: number;
  shareUrl: string;
}
```

### Content Structure Example

```markdown
# Tutorial: Your First Clarity Contract

## Learning Objectives
- Understand Clarity syntax
- Deploy a contract to testnet
- Interact with contract functions

## Prerequisites
- Basic programming knowledge
- Stacks wallet setup

## Step 1: Contract Structure
```clarity
(define-public (hello-world)
  (ok "Hello, Bitcoin!"))
```

## Interactive Exercise
Deploy this contract and call the function.

[Code Editor Component]

## Verification
Your contract should return "Hello, Bitcoin!" when called.
```

## 🎯 Go-to-Market Strategy

### Target Audience
1. **Primary**: Developers new to Bitcoin/Stacks development
2. **Secondary**: Existing web developers wanting to learn blockchain
3. **Tertiary**: Bitcoin enthusiasts wanting to build

### Launch Strategy
1. **Soft Launch**: Stacks Discord/Twitter community
2. **Content Marketing**: Tutorial blog posts, YouTube videos
3. **Community Partnerships**: Collaborate with Hiro, other Stacks projects
4. **Developer Events**: Present at Stacks meetups, Bitcoin conferences

### Success Metrics
- **Level 2**: 10 beta users, 1 complete course
- **Level 3**: 100 registered users, 50 certificates issued
- **Level 4**: 500 users, 200 certificates, 1 community contribution
- **Level 5**: 1000+ users, 500+ certificates, active community

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Stacks wallet (Hiro Wallet or Xverse)
- Basic understanding of React/TypeScript

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bitcoin-developer-academy.git
cd bitcoin-developer-academy

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Install Clarinet for smart contract development
curl -L https://github.com/hirosystems/clarinet/releases/download/v1.8.0/clarinet-linux-x64.tar.gz | tar xz
sudo mv clarinet /usr/local/bin

# Start development server
npm run dev
```

### Development Workflow

```bash
# Start the development server
npm run dev

# Run smart contract tests
clarinet test

# Deploy contracts to testnet
clarinet deploy --testnet

# Build for production
npm run build
```

## 🎯 Risk Mitigation

### Technical Risks
- **Smart Contract Bugs**: Comprehensive testing, gradual rollout
- **Scalability**: Start simple, optimize based on usage
- **User Experience**: Regular user testing, iterative improvements

### Market Risks
- **Competition**: Focus on Bitcoin-native angle, community building
- **Adoption**: Start with existing Stacks community, expand gradually
- **Content Quality**: Establish review process, community moderation

## 📈 Success Metrics by Phase

### Level 2 Targets
- 10 beta users testing the platform
- 1 complete course with interactive elements
- Working smart contract deployment on testnet
- First tutorial blog post published

### Level 3 Targets
- 100 registered users
- 50 certificates issued
- 3 complete courses available
- Active community engagement

### Level 4 Targets
- 500 active users
- 200 certificates issued
- 1 community-contributed tutorial
- Integration with major Stacks tools

### Level 5 Targets
- 1000+ registered users
- 500+ certificates issued
- Active community of contributors
- Partnerships with ecosystem projects

## 🛠️ Technical Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code editor)
- **Wallet Integration**: Stacks.js, Connect library
- **State Management**: Zustand or Redux Toolkit

### Backend
- **API**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with wallet integration
- **File Storage**: IPFS for content, Gaia for user data

### Blockchain
- **Smart Contracts**: Clarity language
- **Development**: Clarinet CLI
- **Testing**: Clarinet testing framework
- **Deployment**: Stacks testnet → mainnet

### DevOps
- **Hosting**: Vercel or Netlify
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry for error tracking
- **Analytics**: Plausible or Google Analytics

## 🎓 Educational Content Strategy

### Course Progression

#### Beginner Track
1. **Bitcoin & Stacks Fundamentals**
   - What is Bitcoin?
   - Introduction to Stacks
   - Setting up development environment

2. **Your First Smart Contract**
   - Clarity syntax basics
   - Writing simple functions
   - Deploying to testnet

3. **Building a DApp Frontend**
   - Connecting wallet to web app
   - Reading from smart contracts
   - Sending transactions

#### Intermediate Track
4. **Token Standards & NFTs**
   - SIP-009 NFT standard
   - SIP-010 fungible tokens
   - Marketplace mechanics

5. **DeFi Fundamentals**
   - Automated Market Makers
   - Lending protocols
   - Yield farming concepts

6. **Advanced Clarity Patterns**
   - Error handling
   - Access control
   - Upgradeable contracts

#### Advanced Track
7. **Bitcoin Integration**
   - sBTC mechanics
   - Cross-chain interactions
   - Bitcoin script integration

8. **Production Deployment**
   - Security best practices
   - Gas optimization
   - Monitoring and maintenance

9. **Ecosystem Integration**
   - Working with existing protocols
   - Building composable applications
   - Community governance

## 🌟 Community Features

### Mentorship Program
- Pair experienced developers with newcomers
- Regular office hours and Q&A sessions
- Code review and feedback system

### Contribution Rewards
- NFT badges for tutorial contributions
- Reputation system for community helpers
- Revenue sharing for popular content

### Developer Showcase
- Monthly featured projects
- Demo days for completed courses
- Job board for Stacks ecosystem roles

## 📅 Week 1 Action Items

### Immediate Next Steps
1. **Set up development environment**
   - Install Node.js, Git, and Clarinet
   - Create GitHub repository
   - Initialize Next.js project

2. **Design and Planning**
   - Create basic UI mockups
   - Plan first tutorial content
   - Design smart contract architecture

3. **Stacks Ascent Application**
   - Complete Level 1 application
   - Join Stacks developer community
   - Start building network

4. **Content Creation**
   - Write first blog post about the project
   - Create project roadmap
   - Plan social media strategy

### Resources Needed
- Domain name registration
- Basic hosting setup (Vercel/Netlify)
- Design assets creation
- Content planning and writing

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Ways to Contribute

1. **Content Creation**: Write tutorials, create exercises
2. **Code Contributions**: Frontend features, smart contract improvements
3. **Community Building**: Help other learners, provide feedback
4. **Testing**: Report bugs, test new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Stacks Ascent Program](https://stacks.org/ascent)
- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Language Reference](https://docs.stacks.co/clarity)
- [Hiro Developer Tools](https://www.hiro.so)

## 📞 Contact

- **Discord**: [Join our community](https://discord.gg/stacks)
- **Twitter**: [@BitcoinDevAcademy](https://twitter.com/bitcoindevacademy)
- **Email**: hello@bitcoindevacademy.com

---

**Built with ❤️ for the Bitcoin ecosystem**
