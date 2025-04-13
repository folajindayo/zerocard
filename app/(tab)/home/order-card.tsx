import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderCardFlow from '../../../components/OrderCardFlow';
import NameInput from '../../../components/NameInput';
import DOBInput from '../../../components/DOBInput';
import OrderConfirmation from '../../../components/OrderConfirmation';

export default function OrderCardPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'name' | 'dob'>('intro');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });
  const params = useLocalSearchParams();
  const hideTabBar = params.hideTabBar === 'true';
  const showConfirmation = params.showConfirmation === 'true';
  const identity = params.identity as string;
  const isAndroid = Platform.OS === 'android';

  const handleClose = () => {
    router.back();
  };

  const handleGetStarted = () => {
    setCurrentStep('name');
  };

  const handleBack = () => {
    if (currentStep === 'name') {
      setCurrentStep('intro');
    } else if (currentStep === 'dob') {
      setCurrentStep('name');
    }
  };

  const handleNameContinue = (firstName: string, lastName: string) => {
    setFormData(prev => ({ ...prev, firstName, lastName }));
    setCurrentStep('dob');
  };

  const handleDOBContinue = (dob: string) => {
    setFormData(prev => ({ ...prev, dateOfBirth: dob }));
    console.log('Form data:', formData);
  };

  const handleBackToHome = () => {
    router.replace('/(tab)/home');
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
        {showConfirmation ? (
          <OrderConfirmation onBackHome={handleBackToHome} />
        ) : (
          <>
            {currentStep === 'intro' && (
              <OrderCardFlow 
                onClose={handleClose} 
                onGetStarted={handleGetStarted}
              />
            )}
            
            {currentStep === 'name' && (
              <NameInput 
                onClose={handleClose}
                onBack={handleBack}
                onContinue={handleNameContinue}
              />
            )}

            {currentStep === 'dob' && (
              <DOBInput
                userName={formData.firstName}
                onClose={handleClose}
                onBack={handleBack}
                onContinue={handleDOBContinue}
              />
            )}
          </>
        )}
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