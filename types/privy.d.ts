import '@privy-io/expo';

declare module '@privy-io/expo' {
  interface UsePrivy {
    ready: boolean;
    user: any;
    authenticated: boolean;
    login: () => void;
    logout: () => Promise<void>;
    // Add other properties as needed
  }
} 