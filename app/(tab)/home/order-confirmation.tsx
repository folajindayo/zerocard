import React from 'react';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import OrderConfirmation from '../../../components/OrderConfirmation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderConfirmationScreen() {
  const isAndroid = Platform.OS === 'android';
  const params = useLocalSearchParams();
  const identity = params.identity as string;

  const handleBackToHome = async () => {
    try {
      // Save that the card has been ordered and username verified
      await AsyncStorage.setItem('user_verified', 'true');
      await AsyncStorage.setItem('card_ordered', 'true');

      // If we have identity information, save it
      if (identity) {
        await AsyncStorage.setItem('identity_type', identity);
      }

      // Navigate back to home
      router.replace('/(tab)/home');
    } catch (error) {
      console.error('Error saving user verification state:', error);
      // Still navigate even if saving fails
      router.replace('/(tab)/home');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: isAndroid ? 'slide_from_bottom' : undefined,
          gestureEnabled: true,
        }}
      />
      <SafeAreaView style={styles.container}>
        <OrderConfirmation onBackHome={handleBackToHome} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
