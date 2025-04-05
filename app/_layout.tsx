import '../global.css';
import { Stack } from 'expo-router';
import { PrivyProvider, PrivyElements } from '@privy-io/expo';
import Constants from 'expo-constants';
import { useEffect, useCallback } from 'react';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { View, useColorScheme } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Load fonts
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Get device color scheme
  const colorScheme = useColorScheme();

  // Get Privy app ID and client ID strictly from Constants
  const privyAppId = Constants.expoConfig?.extra?.privyAppId;
  const privyClientId = Constants.expoConfig?.extra?.privyClientId;

  useEffect(() => {
    console.log('=== Privy Configuration Debug ===');
    if (!privyAppId) {
      console.warn('Warning: Privy App ID is missing in Expo Constants! Check .env and app.json configuration.');
    } else {
      console.log('Privy App ID:', privyAppId);
    }
    if (!privyClientId) {
      console.warn('Warning: Privy Client ID is missing in Expo Constants! Check .env and app.json configuration.');
    } else {
      console.log('Privy Client ID:', privyClientId);
    }
    console.log('Expo Constants (extra):', JSON.stringify(Constants.expoConfig?.extra, null, 2));
    console.log('=== End Privy Configuration Debug ===');

    // Log font loading status
    if (fontError) {
      console.error('Font loading error:', fontError);
    }
    if (fontsLoaded) {
      console.log('Fonts loaded successfully.');
    }

  }, [privyAppId, privyClientId, fontsLoaded, fontError]);
  
  // Hide splash screen once fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Ensure credentials exist before rendering provider
  if (!privyAppId || !privyClientId) {
    console.error("Privy App ID or Client ID is missing. Cannot initialize PrivyProvider.");
    // Consider hiding splash screen here too if returning early
    // SplashScreen.hideAsync(); 
    // return null; 
  }

  // Don't render anything until the fonts are loaded
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    // Use onLayout to ensure fonts are loaded before hiding splash screen
    // Need a View or similar component here to attach onLayout
    // Let's wrap PrivyProvider (or Stack/PrivyElements) - needs careful thought
    // Simplest: Let the splash screen hide even if PrivyProvider fails momentarily?
    // Or rely on the null return above?
    // Let's try relying on the null return and call hideAsync in useEffect maybe?
    // Let's stick to the recommended `onLayout` pattern for hiding splash screen.
    // We need a parent View for onLayout.
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PrivyProvider
        appId={privyAppId} 
        clientId={privyClientId}
        config={{
          embedded: {
            ethereum: {
              createOnLogin: 'users-without-wallets',
            },
          },
        }}
      >
        <Stack 
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#f7f7f7' },
          }}
        />
        <PrivyElements config={{appearance: {colorScheme: colorScheme ?? 'light'}}} />
      </PrivyProvider>
    </View>
  );
} 