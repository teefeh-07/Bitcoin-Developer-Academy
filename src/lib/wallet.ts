import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

// App configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

// Network configuration
export const network = process.env.NEXT_PUBLIC_STACKS_NETWORK === 'mainnet' 
  ? new StacksMainnet() 
  : new StacksTestnet();

// Wallet connection
export const connectWallet = () => {
  showConnect({
    appDetails: {
      name: 'Bitcoin Developer Academy',
      icon: '/logo.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
};

// Get user data
export const getUserData = () => {
  if (userSession.isUserSignedIn()) {
    return userSession.loadUserData();
  }
  return null;
};

// Disconnect wallet
export const disconnectWallet = () => {
  userSession.signUserOut('/');
};

// Check if user is signed in
export const isUserSignedIn = () => {
  return userSession.isUserSignedIn();
};

// Get user address
export const getUserAddress = () => {
  const userData = getUserData();
  return userData?.profile?.stxAddress?.testnet || userData?.profile?.stxAddress?.mainnet;
};
