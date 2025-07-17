import {
  makeContractCall,
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV,
  contractPrincipalCV,
} from '@stacks/transactions';
import { network, userSession } from './wallet';

// Contract addresses (will be updated after deployment)
export const CERTIFICATE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS || '';
export const PROGRESS_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PROGRESS_CONTRACT_ADDRESS || '';

// Certificate NFT contract functions
export const mintCertificate = async (
  recipient: string,
  courseId: number,
  skillLevel: number,
  metadata: string
) => {
  const functionArgs = [
    principalCV(recipient),
    uintCV(courseId),
    uintCV(skillLevel),
    stringAsciiCV(metadata),
  ];

  const txOptions = {
    contractAddress: CERTIFICATE_CONTRACT_ADDRESS,
    contractName: 'certificate-nft',
    functionName: 'mint-certificate',
    functionArgs,
    senderKey: userSession.loadUserData().appPrivateKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, network);
};

export const createCourse = async (
  courseId: number,
  name: string,
  description: string,
  difficulty: number
) => {
  const functionArgs = [
    uintCV(courseId),
    stringAsciiCV(name),
    stringAsciiCV(description),
    uintCV(difficulty),
  ];

  const txOptions = {
    contractAddress: CERTIFICATE_CONTRACT_ADDRESS,
    contractName: 'certificate-nft',
    functionName: 'create-course',
    functionArgs,
    senderKey: userSession.loadUserData().appPrivateKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, network);
};

// Progress tracker contract functions
export const completeModule = async (
  moduleId: number,
  timeSpent: number,
  score: number
) => {
  const functionArgs = [
    uintCV(moduleId),
    uintCV(timeSpent),
    uintCV(score),
  ];

  const txOptions = {
    contractAddress: PROGRESS_CONTRACT_ADDRESS,
    contractName: 'progress-tracker',
    functionName: 'complete-module',
    functionArgs,
    senderKey: userSession.loadUserData().appPrivateKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, network);
};

export const createModule = async (
  moduleId: number,
  courseId: number,
  name: string,
  description: string,
  pointsReward: number,
  difficulty: number,
  estimatedTime: number
) => {
  const functionArgs = [
    uintCV(moduleId),
    uintCV(courseId),
    stringAsciiCV(name),
    stringAsciiCV(description),
    uintCV(pointsReward),
    uintCV(difficulty),
    uintCV(estimatedTime),
  ];

  const txOptions = {
    contractAddress: PROGRESS_CONTRACT_ADDRESS,
    contractName: 'progress-tracker',
    functionName: 'create-module',
    functionArgs,
    senderKey: userSession.loadUserData().appPrivateKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
  };

  const transaction = await makeContractCall(txOptions);
  return broadcastTransaction(transaction, network);
};

// Read-only contract calls
export const getCertificateData = async (tokenId: number) => {
  // This would use callReadOnlyFunction from @stacks/transactions
  // Implementation depends on having a deployed contract
  return null;
};

export const getUserProgress = async (userAddress: string) => {
  // This would use callReadOnlyFunction from @stacks/transactions
  // Implementation depends on having a deployed contract
  return null;
};

export const getCourseProgress = async (courseId: number, userAddress: string) => {
  // This would use callReadOnlyFunction from @stacks/transactions
  // Implementation depends on having a deployed contract
  return null;
};
