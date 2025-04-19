import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView, { AnimationObject } from 'lottie-react-native';

interface LottieAnimationProps {
  source: string | AnimationObject | { uri: string };
  size?: number;
  autoPlay?: boolean;
  loop?: boolean;
}

export const LottieAnimation = ({
  source,
  size = 150,
  autoPlay = true,
  loop = true,
}: LottieAnimationProps) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={source}
        style={{
          width: size,
          height: size,
        }}
        autoPlay={autoPlay}
        loop={loop}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LottieAnimation;
