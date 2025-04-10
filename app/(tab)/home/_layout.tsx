import React from 'react';
import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function HomeLayout() {
  console.log("Rendering HomeLayout");
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          // Index is the default screen
        }}
      />
      <Stack.Screen 
        name="order-card" 
        options={{
          presentation: 'fullScreenModal',
        }}
      />
    </Stack>
  );
} 