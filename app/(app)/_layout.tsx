import { Stack, Redirect } from 'expo-router';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { AuthBoundary } from '@privy-io/expo';

// Loading component for AuthBoundary
function FullScreenLoader() {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#40ff00" />
    </View>
  );
}

// Error component for AuthBoundary
function ErrorScreen({ error }: { error: Error }) {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Error</Text>
      <Text style={styles.errorMessage}>{error.message}</Text>
    </View>
  );
}

export default function AppLayout() {
  return (
    <AuthBoundary
      loading={<FullScreenLoader />}
      error={(error) => <ErrorScreen error={error} />}
      unauthenticated={<Redirect href="/" />}
    >
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: { backgroundColor: '#f7f7f7' },
        }}
      />
    </AuthBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
