import '../global.css';
import { Stack } from 'expo-router';
import { PrivyProvider, PrivyElements } from '@privy-io/expo';
import { useEffect } from 'react';

export default function RootLayout() {
  // Get Privy app ID and client ID directly from environment variables
  // Ensure these are defined in your .env file and prefixed correctly (e.g., EXPO_PUBLIC_)
  const privyAppId = process.env.EXPO_PUBLIC_PRIVY_APP_ID || '';
  const privyClientId = process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID || '';

  useEffect(() => {
    console.log('=== Privy Configuration Debug ===');
    console.log('Privy App ID from ENV:', privyAppId);
    console.log('Privy Client ID from ENV:', privyClientId);
    // Removed logging Expo Constants as it's not relevant for Privy IDs anymore
    console.log('=== End Privy Configuration Debug ===');

    // Optional: Add a check to ensure the environment variables are loaded
    if (!privyAppId || !privyClientId) {
      console.warn(
        'Privy App ID or Client ID not found in environment variables. ' +
        'Ensure EXPO_PUBLIC_PRIVY_APP_ID and EXPO_PUBLIC_PRIVY_CLIENT_ID are set in your .env file.'
      );
    }
  }, [privyAppId, privyClientId]);
  
  // Ensure PrivyProvider receives valid strings
  if (!privyAppId || !privyClientId) {
    // Optionally render a loading state or error message if IDs are missing
    console.error("Privy IDs are missing from environment variables!");
    // Return null or an error component to prevent app crash
    return null; 
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      clientId={privyClientId}
    >
      <Stack 
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f7f7f7' },
        }}
      />
      <PrivyElements />
    </PrivyProvider>
  );
} 