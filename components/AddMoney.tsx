import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Clipboard, ToastAndroid, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import QRCode from 'react-native-qrcode-svg';
import { Button, buttonContainerStyles } from './Button';
import { SquircleView } from 'react-native-figma-squircle';

// Import SVG files as strings
const usdcSvg = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.50041 16.4288C12.7978 16.4288 16.2546 12.8942 16.2546 8.50001C16.2546 4.10586 12.7978 0.571198 8.50041 0.571198C4.20303 0.571198 0.746216 4.10586 0.746216 8.50001C0.746216 12.8942 4.20303 16.4288 8.50041 16.4288Z" fill="#2775CA"/>
<path d="M10.6328 9.75514C10.6328 8.59912 9.95434 8.20268 8.59736 8.03697C7.62808 7.90455 7.43423 7.64053 7.43423 7.17828C7.43423 6.71603 7.75758 6.41869 8.4035 6.41869C8.98507 6.41869 9.30842 6.61691 9.4697 7.11247C9.50227 7.21158 9.5992 7.27739 9.69613 7.27739H10.2133C10.3428 7.27739 10.4398 7.17828 10.4398 7.04586V7.01256C10.3103 6.28549 9.72869 5.72413 8.98584 5.65832V4.86544C8.98584 4.73303 8.88892 4.63392 8.72763 4.60141H8.24299C8.1135 4.60141 8.01657 4.70052 7.98478 4.86544V5.62502C7.0155 5.75743 6.40137 6.4179 6.40137 7.24408C6.40137 8.3343 7.04729 8.76404 8.40428 8.92896C9.30919 9.09388 9.59997 9.2921 9.59997 9.82095C9.59997 10.3498 9.14791 10.7129 8.53377 10.7129C7.69399 10.7129 7.40321 10.3498 7.30628 9.85425C7.27372 9.72184 7.17679 9.65603 7.07986 9.65603H6.53087C6.40137 9.65603 6.30444 9.75514 6.30444 9.88755V9.92085C6.43394 10.747 6.95037 11.3417 8.01657 11.5066V12.2995C8.01657 12.4319 8.1135 12.531 8.27478 12.5635H8.75942C8.88892 12.5635 8.98584 12.4644 9.01764 12.2995V11.5066C9.98613 11.3409 10.6328 10.6471 10.6328 9.75514Z" fill="white"/>
<path d="M6.85257 13.224C4.33245 12.2987 3.03983 9.42451 3.97731 6.88095C4.46195 5.49341 5.52815 4.4365 6.85257 3.94094C6.98206 3.87514 7.04642 3.77603 7.04642 3.61031V3.14806C7.04642 3.01565 6.98206 2.91654 6.85257 2.88403C6.82 2.88403 6.75564 2.88403 6.72307 2.91733C3.65396 3.90844 1.97363 7.24488 2.9429 10.3839C3.52447 12.2337 4.91402 13.6545 6.72307 14.2492C6.85257 14.315 6.98129 14.2492 7.01385 14.1168C7.04642 14.0835 7.04642 14.051 7.04642 13.9844V13.5221C7.04642 13.4222 6.94949 13.2906 6.85257 13.224ZM10.2768 2.91654C10.1473 2.85073 10.0186 2.91654 9.98603 3.04895C9.95347 3.08225 9.95347 3.11476 9.95347 3.18136V3.64361C9.95347 3.77602 10.0504 3.90764 10.1473 3.97425C12.6674 4.89954 13.9601 7.77374 13.0226 10.3173C12.5379 11.7048 11.4717 12.7618 10.1473 13.2573C10.0178 13.3231 9.95347 13.4222 9.95347 13.5879V14.0502C9.95347 14.1826 10.0178 14.2817 10.1473 14.3142C10.1799 14.3142 10.2442 14.3142 10.2768 14.2809C13.3459 13.2898 15.0263 9.95337 14.057 6.81435C13.4754 4.93205 12.0541 3.5112 10.2768 2.91654Z" fill="white"/>
</svg>`;

// Simplified Base logo (using a smaller part of the SVG for better performance)
const baseLogoSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="#0052FF" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="12" fill="#0052FF"/>
  <path d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="white" fill-opacity="0.7"/>
  <path d="M15 9.5C15 11.433 13.433 13 11.5 13H9V16H7V9.5C7 8.12 8.12 7 9.5 7H11.5C13.433 7 15 8.567 15 9.5Z" fill="#0052FF"/>
  <path d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8H9V11H11.5Z" fill="white"/>
</svg>`;

interface AddMoneyProps {
  onFundedWallet: () => void;
  onSkip: () => void;
}

const AddMoney: React.FC<AddMoneyProps> = ({ onFundedWallet, onSkip }) => {
  // Sample wallet address - this would come from your wallet/blockchain integration
  const walletAddress = "0xf235...6h92F";
  const fullWalletAddress = "0xf235c72e61d7339c76f6b36d8d8c0b6h92F";

  // Handle copying wallet address to clipboard
  const copyToClipboard = () => {
    Clipboard.setString(fullWalletAddress);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Address copied to clipboard', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Address copied to clipboard');
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add money 😉</Text>
        
        <View style={styles.contentContainer}>
          {/* Token selector */}
          <View style={styles.tokenRow}>
            <View style={styles.tokenSelector}>
              <Text style={styles.tokenSelectorText}>Supported tokens</Text>
              <View style={styles.tokenBadge}>
                <SvgXml xml={usdcSvg} width={24} height={18} />
                <Text style={styles.tokenText}>USDC</Text>
              </View>
            </View>
          </View>
          
          {/* QR Code container */}
          <SquircleView
            style={styles.qrContainer}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 20,
              fillColor: '#FFFFFF',
            }}
          >
            <QRCode
              value={fullWalletAddress}
              size={280}
              color="#000000"
              backgroundColor="#ffffff"
              logoBackgroundColor="white"
            />
          </SquircleView>
          
          {/* Wallet address row */}
          <View style={styles.addressRow}>
            <View style={styles.addressContainer}>
              <SvgXml xml={baseLogoSvg} width={16} height={16} />
              <Text style={styles.addressText}>{walletAddress}</Text>
            </View>
            
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyText}>Copy</Text>
              <Ionicons name="copy-outline" size={16} color="#121212" />
            </TouchableOpacity>
          </View>
          
          {/* Info message */}
          <SquircleView
            style={styles.infoContainer}
            squircleParams={{
              cornerSmoothing: 1,
              cornerRadius: 20,
              fillColor: '#ECECEC',
            }}
          >
            <Ionicons name="information-circle-outline" size={16} color="#484848" />
            <Text style={styles.infoText}>
              Only send USDC on Base to this address, it is only enabled to hold ERC20 tokens on Base
            </Text>
          </SquircleView>
        </View>
        
        {/* Button container */}
        <View style={buttonContainerStyles.container}>
          <Button 
            title="I've funded the wallet"
            variant="primary"
            onPress={onFundedWallet}
          />
          
          <Button 
            title="Skip"
            variant="secondary"
            showRightArrow={true}
            onPress={onSkip}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    gap: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'SF Pro Text',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: 0,
    color: '#121212',
    alignSelf: 'stretch',
  },
  contentContainer: {
    width: 329,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    gap: 12,
  },
  tokenRow: {
    width: 329,
    height: 39,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    gap: 24,
    alignSelf: 'stretch',
  },
  tokenSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16,
    gap: 10,
    width: 329,
    height: 39,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 1000,
    flex: 1,
  },
  tokenSelectorText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    letterSpacing: 0,
    color: '#121212',
  },
  tokenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 4,
    width: 67,
    height: 23,
  },
  tokenText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    letterSpacing: 0,
    color: '#121212',
  },
  qrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 8,
    gap: 10,
    width: 329,
    height: 320,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    gap: 24,
    alignSelf: 'stretch',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    gap: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 1000,
  },
  addressText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    letterSpacing: 0,
    color: '#121212',
  },
  copyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
    gap: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    borderRadius: 1000,
  },
  copyText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
    letterSpacing: -0.42,
    color: '#121212',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    gap: 8,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  infoText: {
    fontFamily: 'SF Pro Text',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#484848',
    flex: 1,
  },
});

export default AddMoney; 