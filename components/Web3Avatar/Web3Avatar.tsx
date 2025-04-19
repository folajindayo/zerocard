import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { generateGradientColors } from './utils';
import { Web3AvatarProps } from './types';

/**
 * Web3Avatar generates unique gradient avatars from Ethereum addresses
 *
 * @example
 * ```tsx
 * <Web3Avatar
 *   address="0x11Ed0AC7D6142481E459B6e5d4bfB5646277796f"
 *   size={60}
 * />
 * ```
 */
const Web3Avatar: React.FC<Web3AvatarProps> = ({ address, size = 40, style, borderRadius }) => {
  // Generate colors based on address
  const generatedColors = generateGradientColors(address);

  // Fallback colors if we somehow get less than 2 colors
  const defaultColors = ['rgb(233, 30, 99)', 'rgb(156, 39, 176)'];

  // Default to circular avatar if borderRadius not specified
  const finalBorderRadius = borderRadius ?? size / 2;

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: finalBorderRadius },
        style,
      ]}>
      <LinearGradient
        colors={[
          generatedColors[0] || defaultColors[0],
          generatedColors[1] || defaultColors[1],
          generatedColors[2] || defaultColors[0],
        ]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
});

export default Web3Avatar;
