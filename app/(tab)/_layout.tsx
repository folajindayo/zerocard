import { Tabs, Redirect, Stack } from 'expo-router';
import { View, StatusBar } from 'react-native';
import { AuthBoundary } from '@privy-io/expo';
import NavigationBar from '../../components/navigation/NavigationBar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';

// Loading and Error components for AuthBoundary
function FullScreenLoader() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
      {/* Activity indicator would go here */}
    </View>
  );
}

function ErrorScreen({ error }: { error: Error }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7', padding: 20 }}>
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AuthBoundary
        loading={<FullScreenLoader />}
        error={(error) => <ErrorScreen error={error} />}
        unauthenticated={<Redirect href="/" />}
      >
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Hide the default tab bar
            contentStyle: { backgroundColor: '#f7f7f7', paddingHorizontal: 16 },
          }}
          // Use our custom NavigationBar
          tabBar={() => <NavigationBar />}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              // This makes home/index.tsx the default for the "home" route
              href: {
                pathname: "home/index"
              }
            }}
          />
          <Tabs.Screen
            name="card/index"
            options={{
              title: 'Card',
            }}
          />
          <Tabs.Screen
            name="load-wallet/index"
            options={{
              title: 'Load Wallet',
            }}
          />
          <Tabs.Screen
            name="profile/index"
            options={{
              title: 'Profile',
            }}
          />
        </Tabs>
      </AuthBoundary>
    </SafeAreaProvider>
  );
}