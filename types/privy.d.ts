import '@privy-io/expo';

declare module '@privy-io/expo' {
  interface UsePrivy {
    isReady: boolean;
    user: any;
    logout: () => Promise<void>;
    // Add other properties as needed
  }
} 