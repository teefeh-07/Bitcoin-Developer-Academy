// User and Authentication Types
export interface User {
  address: string;
  bnsName?: string;
  profile?: UserProfile;
  progress: UserProgress;
  certificates: Certificate[];
}

export interface UserProfile {
  displayName?: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    discord?: string;
  };
}

// Progress and Learning Types
export interface UserProgress {
  completedModules: number[];
  currentCourse?: number;
  totalPoints: number;
  currentStreak: number;
  lastActivity: Date;
  skillLevel: SkillLevel;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
  estimatedTime: string;
  prerequisites?: number[];
  tags: string[];
  isPublished: boolean;
  author: string;
}

export interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  content: string; // Markdown content
  codeExercise?: CodeExercise;
  quiz?: Quiz;
  estimatedTime: string;
  order: number;
}

export interface CodeExercise {
  id: number;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints?: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Quiz {
  id: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Certificate and Achievement Types
export interface Certificate {
  tokenId: number;
  courseId: number;
  courseName: string;
  recipient: string;
  completionDate: Date;
  skillLevel: SkillLevel;
  ipfsMetadata: string;
  transactionId: string;
}

export enum SkillLevel {
  BEGINNER = 1,
  INTERMEDIATE = 2,
  ADVANCED = 3,
  EXPERT = 4,
}

// Smart Contract Types
export interface ContractCall {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: any[];
  senderAddress: string;
}

export interface ContractDeployment {
  contractName: string;
  codeBody: string;
  senderAddress: string;
}

// Tutorial and Content Types
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  tags: string[];
  author: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  prerequisites?: string[];
}

export interface TutorialProgress {
  tutorialId: string;
  userId: string;
  currentStep: number;
  totalSteps: number;
  completedAt?: Date;
  codeSubmissions: CodeSubmission[];
}

export interface CodeSubmission {
  stepId: string;
  code: string;
  isCorrect: boolean;
  submittedAt: Date;
  feedback?: string;
}

// Wallet and Network Types
export interface WalletState {
  isConnected: boolean;
  address?: string;
  network: 'mainnet' | 'testnet';
  balance?: {
    stx: string;
    btc?: string;
  };
}

export interface NetworkConfig {
  name: string;
  url: string;
  chainId: string;
  isTestnet: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Component Props Types
export interface TutorialProps {
  tutorial: Tutorial;
  onComplete: (submission: CodeSubmission) => void;
  onProgress: (step: number) => void;
}

export interface CodeEditorProps {
  initialCode: string;
  language: 'clarity' | 'javascript' | 'typescript';
  onCodeChange: (code: string) => void;
  onRun?: (code: string) => void;
  readOnly?: boolean;
  height?: string;
}

export interface CertificateCardProps {
  certificate: Certificate;
  showDetails?: boolean;
  onShare?: () => void;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  showPercentage?: boolean;
  color?: 'bitcoin' | 'stacks' | 'green';
}

// Form Types
export interface LoginForm {
  walletType: 'hiro' | 'xverse' | 'leather';
}

export interface ProfileForm {
  displayName: string;
  bio: string;
  socialLinks: {
    twitter: string;
    github: string;
    discord: string;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
}

// State Management Types
export interface AppState {
  user: User | null;
  wallet: WalletState;
  courses: Course[];
  currentTutorial: Tutorial | null;
  loading: boolean;
  error: AppError | null;
}

// Event Types
export interface TutorialEvent {
  type: 'start' | 'complete' | 'progress' | 'code_submit';
  tutorialId: string;
  userId: string;
  data?: any;
  timestamp: Date;
}

export interface CertificateEvent {
  type: 'mint' | 'view' | 'share';
  certificateId: number;
  userId: string;
  timestamp: Date;
}
