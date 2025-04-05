import React from 'react';
import { View, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import LottieAnimation from './LottieAnimation';

interface LoadingSpinnerProps {
  size?: 'small' | 'large' | number;
  color?: string;
  style?: ViewStyle;
  useLottie?: boolean;
  lottieSource?: string;
}

/**
 * A reusable loading spinner component that can use either 
 * the standard ActivityIndicator or a Lottie animation.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = '#40ff00',
  style,
  useLottie = true,
  lottieSource = 'https://lottie.host/ba1c24cb-50de-47c1-8781-d609401ac8df/qn48q8KwW9.lottie'
}) => {
  const spinnerSize = typeof size === 'string' ? (size === 'large' ? 50 : 24) : size;

  return (
    <View style={[styles.container, style]}>
      {useLottie ? (
        <LottieAnimation 
          source={lottieSource} 
          size={spinnerSize * 3} 
          autoPlay 
          loop 
        />
      ) : (
        <ActivityIndicator size={size} color={color} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default LoadingSpinner; 