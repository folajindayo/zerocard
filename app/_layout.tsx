import '../global.css';
import { Stack } from 'expo-router';
import { PrivyProvider, PrivyElements } from '@privy-io/expo';
import Constants from 'expo-constants';
import { useEffect } from 'react';

export default function RootLayout() {
  // Get Privy app ID and client ID from Constants
  const privyAppId = Constants.expoConfig?.extra?.privyAppId || '';
  const privyClientId = Constants.expoConfig?.extra?.privyClientId || '';

  useEffect(() => {
    console.log('=== Privy Configuration Debug ===');
    console.log('Privy App ID:', privyAppId);
    console.log('Privy Client ID:', privyClientId);
    console.log('Expo Constants:', JSON.stringify(Constants.expoConfig, null, 2));
    console.log('=== End Privy Configuration Debug ===');
  }, [privyAppId, privyClientId]);
  
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