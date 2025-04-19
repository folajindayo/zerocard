import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { SquircleView } from 'react-native-figma-squircle';
import * as LocalAuthentication from 'expo-local-authentication';

// Import SVG assets as strings
const cardBaseSvg = `<svg width="354" height="226" viewBox="0 0 354 226" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="354" height="226" rx="20" fill="#E2E2E2"/>
</svg>`;

const walletBaseSvg = `<svg width="354" height="226" viewBox="0 0 354 226" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M140.57 8.53149C136.827 3.18453 130.711 0 124.185 0H20C8.95431 0 0 8.9543 0 20V206C0 217.046 8.9543 226 20 226H334C345.046 226 354 217.046 354 206V20C354 8.95431 345.046 0 334 0H227.55C221.965 0 216.634 2.33529 212.848 6.44084L209.667 9.88979C208.72 10.9162 207.388 11.5 205.991 11.5H145.251C143.62 11.5 142.09 10.7039 141.155 9.36713L140.57 8.53149Z" fill="white"/>
</svg>`;

const zeroLogoSvg = `<svg width="51" height="11" viewBox="0 0 51 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_192_832)">
<path d="M45.6325 -4.42261C47.3972 -4.42261 50.7899 -4.02589 50.7899 0.461153C50.7899 4.96187 47.3972 5.34491 45.6325 5.34491H43.5121C41.7474 5.34491 38.3547 4.96187 38.3547 0.461153C38.3547 -4.02589 41.7474 -4.42261 43.5121 -4.42261H45.6325ZM46.3439 2.89619C47.7255 2.89619 48.0675 1.70603 48.0675 0.461153C48.0675 -0.770047 47.7255 -1.96021 46.3439 -1.96021H42.8007C41.4191 -1.96021 41.0771 -0.770047 41.0771 0.461153C41.0771 1.70603 41.4191 2.89619 42.8007 2.89619H46.3439Z" fill="#40FF00"/>
<path d="M45.6325 5.8374C47.3972 5.8374 50.7899 6.23412 50.7899 10.7212C50.7899 15.2219 47.3972 15.6049 45.6325 15.6049H43.5121C41.7474 15.6049 38.3547 15.2219 38.3547 10.7212C38.3547 6.23412 41.7474 5.8374 43.5121 5.8374H45.6325ZM46.3439 13.1562C47.7255 13.1562 48.0675 11.966 48.0675 10.7212C48.0675 9.48996 47.7255 8.2998 46.3439 8.2998H42.8007C41.4191 8.2998 41.0771 9.48996 41.0771 10.7212C41.0771 11.966 41.4191 13.1562 42.8007 13.1562H46.3439Z" fill="white"/>
<path d="M37.4522 4.26877C37.4522 6.41653 36.2758 7.30573 34.9762 7.67509L37.9447 10.3837H34.4016L31.8298 7.92133H28.3961V10.3837H25.7969V0.616211H32.7874C34.5521 0.616211 37.4522 0.88981 37.4522 4.26877ZM28.3961 3.07861V5.47261H33.0062C34.3879 5.47261 34.7299 5.03485 34.7299 4.26877C34.7299 3.50269 34.3879 3.07861 33.0062 3.07861H28.3961Z" fill="white"/>
<path d="M13.8 0.616211H24.4294V3.03757H16.3856V4.39189H20.9758V6.67645H16.3856V7.96237H24.4294V10.3837H13.8V0.616211Z" fill="white"/>
<path d="M12.4351 0.616211V3.25645L4.3776 7.93501H12.4351V10.3837H0V7.74349L8.04384 3.07861H0.1368V0.616211H12.4351Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_192_832">
<rect width="50.7899" height="9.76752" fill="white" transform="translate(0 0.616211)"/>
</clipPath>
</defs>
</svg>`;

interface CardModuleProps {
  cardNumber?: string;
  cardHolderName?: string;
  expiryDate?: string;
  walletAddress?: string;
}

const CardModule: React.FC<CardModuleProps> = ({
  cardNumber = '**** **** **** 0987',
  cardHolderName = 'Temidayo Folajin',
  expiryDate = '05/26',
  walletAddress = 'Oxf235..6h92F',
}) => {
  // State to track if card number is revealed
  const [isCardNumberRevealed, setIsCardNumberRevealed] = useState(false);
  // Masked card number is always shown when not revealed
  const maskedCardNumber = '**** **** **** 0987';
  // The real card number to show after authentication - for demo we'll use a dummy card number
  const realCardNumber = '4242 4242 4242 4242';

  // Function to handle biometric authentication
  const authenticateWithBiometrics = async () => {
    try {
      // Check if device supports biometric authentication
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert('Error', "Your device doesn't support biometric authentication");
        return;
      }

      // Check if biometrics are enrolled
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          'No Biometrics Found',
          'Please set up biometrics in your device settings or use your device PIN/password.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Use PIN',
              onPress: () => authenticateWithFallback(),
            },
          ]
        );
        return;
      }

      // Attempt biometric authentication
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to view card details',
        fallbackLabel: 'Use PIN/Password',
        disableDeviceFallback: false,
      });

      if (result.success) {
        // Authentication succeeded, reveal card number
        setIsCardNumberRevealed(true);

        // Auto-hide card number after 30 seconds
        setTimeout(() => {
          setIsCardNumberRevealed(false);
        }, 30000);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  // Fallback authentication method using device PIN/password
  const authenticateWithFallback = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Enter your device PIN/password',
        fallbackLabel: 'Use PIN/Password',
      });

      if (result.success) {
        setIsCardNumberRevealed(true);

        // Auto-hide card number after 30 seconds
        setTimeout(() => {
          setIsCardNumberRevealed(false);
        }, 30000);
      }
    } catch (error) {
      console.error('Fallback authentication error:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Card Base (Bottom Layer) */}
      <SquircleView
        style={styles.cardBaseContainer}
        squircleParams={{
          cornerSmoothing: 1, // 100% corner smoothing
          cornerRadius: 20,
          fillColor: '#E2E2E2',
        }}>
        <View style={styles.cardBasePlaceholder} />
      </SquircleView>

      {/* Wallet Base (Middle Layer) */}
      <View style={styles.walletBaseContainer}>
        <SvgXml xml={walletBaseSvg} width="100%" height="100%" />
      </View>

      {/* Main Card (Top Layer) */}
      <SquircleView
        style={styles.mainCard}
        squircleParams={{
          cornerSmoothing: 1, // 100% corner smoothing
          cornerRadius: 20,
          fillColor: 'transparent',
        }}>
        <LinearGradient
          colors={['#323232', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientFill}>
          <View style={styles.cardContent}>
            {/* Top Row with Logo and Wallet Address */}
            <View style={styles.topRow}>
              <SvgXml xml={zeroLogoSvg} />
              <SquircleView
                style={styles.walletAddressContainer}
                squircleParams={{
                  cornerSmoothing: 1, // 100% corner smoothing
                  cornerRadius: 16,
                  fillColor: '#292929',
                }}>
                <Text style={styles.walletAddressText}>{walletAddress}</Text>
              </SquircleView>
            </View>

            {/* Card Number - Touchable to reveal */}
            <TouchableOpacity onPress={authenticateWithBiometrics} activeOpacity={0.7}>
              <Text style={styles.cardNumber}>
                {isCardNumberRevealed ? realCardNumber : maskedCardNumber}
              </Text>
            </TouchableOpacity>

            {/* Bottom Row with Name and Expiry */}
            <View style={styles.bottomRow}>
              <Text style={styles.cardHolderName}>{cardHolderName}</Text>
              <Text style={styles.expiryDate}>{expiryDate}</Text>
            </View>
          </View>
        </LinearGradient>
      </SquircleView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 354 / 246,
    alignSelf: 'stretch',
  },
  cardBaseContainer: {
    position: 'absolute',
    width: '100%',
    height: '92%', // Adjusted to maintain proportions
    zIndex: 1,
  },
  cardBasePlaceholder: {
    width: '100%',
    height: '100%',
  },
  walletBaseContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  mainCard: {
    position: 'absolute',
    top: '10.5%',
    width: '100%',
    height: '85.5%',
    zIndex: 3,
  },
  gradientFill: {
    width: '100%',
    height: '100%',
    borderRadius: 20.52, // Backup in case SquircleView fails
  },
  cardContent: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletAddressContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  walletAddressText: {
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    color: '#B1B1B1',
    fontWeight: '500',
  },
  cardNumber: {
    fontFamily: 'Fira Code',
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 0.8, // For letter spacing 0.04em
    marginVertical: 49, // Gap from design spec
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardHolderName: {
    fontFamily: 'Fira Code',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0, // For letter spacing 0.04em
  },
  expiryDate: {
    fontFamily: 'Fira Code',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 0, // For letter spacing 0.04em
  },
});

export default CardModule;
