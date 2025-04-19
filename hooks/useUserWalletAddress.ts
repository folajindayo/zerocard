import { useEmbeddedEthereumWallet } from '@privy-io/expo';
import { useMemo } from 'react';

/**
 * Custom hook to get the address of the first embedded Ethereum wallet
 * associated with the currently authenticated Privy user.
 *
 * @returns The wallet address as a string, or undefined if no user is authenticated,
 *          Privy is not ready, or no embedded wallets are found.
 */
export function useUserWalletAddress(): string | undefined {
  const { wallets } = useEmbeddedEthereumWallet();

  // Use useMemo to return the address of the first wallet, if available.
  // This ensures the hook only causes re-renders if the wallets array actually changes.
  const walletAddress = useMemo(() => {
    // Check if wallets array exists and has at least one wallet
    if (wallets && wallets.length > 0) {
      return wallets[0].address;
    }
    // Return undefined if no wallets are found
    return undefined;
  }, [wallets]); // Dependency array includes wallets

  return walletAddress;
}
