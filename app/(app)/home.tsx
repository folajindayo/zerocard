import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { usePrivy } from '@privy-io/expo';
import { Redirect } from 'expo-router';

export default function HomeScreen() {
  const { user, logout } = usePrivy() as any;

  // If no user, redirect to root
  if (!user) {
    return <Redirect href="/" />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      // No need for navigation here - the Redirect will handle it
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Zerocard</Text>
      <Text style={styles.subtitle}>You are logged in as: {user.email}</Text>
      
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#40ff00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
}); 