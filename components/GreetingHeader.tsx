import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import Web3Avatar from './Web3Avatar';

interface GreetingHeaderProps {
  username: string;
  profileImage?: ImageSourcePropType;
  initial?: string;
  onProfilePress?: () => void;
}

export default function GreetingHeader({
  username,
  profileImage,
  initial = 'U',
  onProfilePress,
}: GreetingHeaderProps) {
  // Get current time to determine greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Hardcoded wallet addresses for demo purposes
  // These will generate different gradient styles based on the address
  const demoAddresses = [
    '0x11Ed0AC7D6142481E459B6e5d4bfB5646277796f',
    '0x2932b7A2355D6fecc4b5c0B6BD44cC31df247a2e',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65'
  ];

  // Choose a demo address based on the first letter of the username for consistency
  const addressIndex = username.charCodeAt(0) % demoAddresses.length;
  const demoAddress = demoAddresses[addressIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={onProfilePress}
        disabled={!onProfilePress}
      >
        {/* Always use Web3Avatar with the demo address */}
        <Web3Avatar 
          address={demoAddress} 
          size={48}
        />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>{getGreeting()},</Text>
        <Text style={styles.usernameText}>{username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CFCFD0',
  },
  initialContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#40ff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  greetingText: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.2,
    color: '#838383',
  },
  usernameText: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.2,
    color: '#000',
  },
}); 