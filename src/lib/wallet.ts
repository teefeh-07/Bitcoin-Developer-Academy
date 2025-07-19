import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, cvToValue, standardPrincipalCV } from '@stacks/transactions';

// App configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

// Network configuration
export const network = process.env.NEXT_PUBLIC_STACKS_NETWORK === 'mainnet'
  ? new StacksMainnet()
  : new StacksTestnet();

// Supported wallets
export const SUPPORTED_WALLETS = {
  HIRO: 'Hiro Wallet',
  XVERSE: 'Xverse',
  LEATHER: 'Leather'
};

// Wallet connection with multiple wallet support
export const connectWallet = (walletType?: string) => {
  const connectOptions = {
    appDetails: {
      name: 'Bitcoin Developer Academy',
      icon: window.location.origin + '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      // Store connection info
      localStorage.setItem('wallet_connected', 'true');
      localStorage.setItem('wallet_type', walletType || 'default');
      window.location.reload();
    },
    onCancel: () => {
      console.log('Wallet connection cancelled');
    },
    userSession,
  };

  // Add wallet-specific options if needed
  if (walletType) {
    // Future: Add wallet-specific connection logic
  }

  showConnect(connectOptions);
};

// Get user data
export const getUserData = () => {
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
  return null;
};



// Check if user is signed in
export const isUserSignedIn = () => {
  return userSession.isUserSignedIn();
};

// Get user address
export const getUserAddress = () => {
  const userData = getUserData();
  const isMainnet = network instanceof StacksMainnet;
  return isMainnet
    ? userData?.profile?.stxAddress?.mainnet
    : userData?.profile?.stxAddress?.testnet;
};

// Get BNS name for user
export const getBNSName = async (address?: string): Promise<string | null> => {
  try {
    const userAddress = address || getUserAddress();
    if (!userAddress) return null;

    // Call BNS contract to get name
    const result = await callReadOnlyFunction({
      contractAddress: 'SP000000000000000000002Q6VF78',
      contractName: 'bns',
      functionName: 'resolve-principal',
      functionArgs: [standardPrincipalCV(userAddress)],
      senderAddress: userAddress,
      network,
    });

    const bnsData = cvToValue(result);
    if (bnsData && bnsData.name && bnsData.namespace) {
      return `${bnsData.name}.${bnsData.namespace}`;
    }

    return null;
  } catch (error) {
    console.error('Error fetching BNS name:', error);
    return null;
  }
};

// Network switching
export const switchNetwork = (networkType: 'testnet' | 'mainnet') => {
  localStorage.setItem('preferred_network', networkType);
  // Note: This would require app restart in a real implementation
  alert(`Network preference saved: ${networkType}. Please refresh the page.`);
};

export const getCurrentNetwork = (): 'testnet' | 'mainnet' => {
  const saved = localStorage.getItem('preferred_network');
  return (saved as 'testnet' | 'mainnet') ||
         (process.env.NEXT_PUBLIC_STACKS_NETWORK === 'mainnet' ? 'mainnet' : 'testnet');
};

// Wallet type detection
export const getConnectedWalletType = (): string => {
  return localStorage.getItem('wallet_type') || 'unknown';
};

// Enhanced disconnect
export const disconnectWallet = () => {
  userSession.signUserOut('/');
  localStorage.removeItem('wallet_connected');
  localStorage.removeItem('wallet_type');
};

// Connection status
export const isWalletConnected = (): boolean => {
  return localStorage.getItem('wallet_connected') === 'true' && userSession.isUserSignedIn();
};

// Format address for display
export const formatAddress = (address: string, length: number = 8): string => {
  if (!address) return '';
  if (address.length <= length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
};
