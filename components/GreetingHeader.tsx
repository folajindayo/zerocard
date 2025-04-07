import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

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

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.profileContainer}
        onPress={onProfilePress}
        disabled={!onProfilePress}
      >
        {profileImage ? (
          <Image 
            source={profileImage} 
            style={styles.profileImage} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.initialContainer}>
            <Text style={styles.initialText}>{initial}</Text>
          </View>
        )}
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