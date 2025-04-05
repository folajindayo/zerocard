import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.imageContainer}>
        {/* Note: You should download the image from the Figma design URL below and add it to your assets folder */}
        {/* https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/0777491a-89ca-4df5-9c31-3397f6fb27e3 */}
        <Image
          source={require('../assets/splash.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Spend crypto{`\n`}
          like cash 💸
        </Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => {
            // @ts-ignore - Navigate to login page
            router.push('/_auth/_login');
          }}
        >
          <Text style={styles.buttonText}>Start spending</Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By using Zerocard, you agree to accept our{' '}
          <Text style={styles.termsLink}>Terms of Use</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>

        <View style={styles.betaButtonContainer}>
          <TouchableOpacity style={styles.betaButton}>
            <Ionicons name="flask-outline" size={14} color="#ababab" />
            <Text style={styles.betaText}>We are in Beta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cardImage: {
    width: '80%',
    height: 400,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
    lineHeight: 43,
  },
  getStartedButton: {
    backgroundColor: '#40ff00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 11 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    // Inner shadow effect (approximated)
    borderTopWidth: 4,
    borderTopColor: '#38e600',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginRight: 8,
    fontFamily: 'System',
  },
  arrowContainer: {
    marginLeft: 4,
  },
  arrow: {
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#ababab',
    marginBottom: 20,
    maxWidth: '80%',
    lineHeight: 16,
  },
  termsLink: {
    color: '#111',
  },
  betaButtonContainer: {
    marginTop: 20,
  },
  betaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
  },
  betaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ababab',
    marginLeft: 4,
  },
});


