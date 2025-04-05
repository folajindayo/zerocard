import * as React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function PostAuthScreen() {
  const router = useRouter();
  
  // Auto-navigate to add-money screen after authentication
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/(app)/add-money');
    }, 2000); // 2 seconds delay
    
    return () => clearTimeout(timer);
  }, [router]); // Added router to dependency array

  return (
    <View style={styles.container}>
      <View style={styles.frameContainer}>
        <ActivityIndicator size={24} color="#2D2D2D" style={styles.spinner} />
        <Text style={styles.signingInText}>Signing in</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  frameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    paddingHorizontal: 12,
    gap: 8,
    position: 'absolute',
    width: 133,
    height: 36,
    left: '50%',
    top: '50%',
    marginLeft: -66.5, // Half of width to center
    marginTop: -18, // Half of height to center
    borderRadius: 1000,
  },
  spinner: {
    margin: 0,
    padding: 0,
  },
  signingInText: {
    fontFamily: 'System',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#000000',
  },
}); 