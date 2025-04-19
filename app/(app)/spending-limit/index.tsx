import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { backIconSvg } from '../../../constants/icons'; // Import icon

// // Back icon SVG - REMOVED
// const backIconSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M15 20.67C14.81 20.67 14.62 20.6 14.47 20.45L7.95003 13.93C6.89003 12.87 6.89003 11.13 7.95003 10.07L14.47 3.55002C14.76 3.26002 15.24 3.26002 15.53 3.55002C15.82 3.84002 15.82 4.32002 15.53 4.61002L9.01003 11.13C8.53003 11.61 8.53003 12.39 9.01003 12.87L15.53 19.39C15.82 19.68 15.82 20.16 15.53 20.45C15.38 20.59 15.19 20.67 15 20.67Z" fill="#FFFFFF"/>
// </svg>`;

export default function SpendingLimitScreen() {
  const router = useRouter();
  const { returnPath } = useLocalSearchParams<{ returnPath?: string }>();
  const [limitAmount, setLimitAmount] = useState('500');

  const handleBack = () => {
    router.back();
  };

  const handleLimitChange = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setLimitAmount(numericText);
  };

  const handleSave = () => {
    // In a real app, this would call an API to set the spending limit
    console.log(`Saving spending limit: $${limitAmount}`);

    // Navigate back with a parameter to show the toast
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <SvgXml xml={backIconSvg} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Spending Limit</Text>
        <View style={styles.emptySpace} />
      </View>

      <View style={styles.content}>
        <Text style={styles.limitText}>Set Daily Spending Limit</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.dollarSign}>$</Text>
          <TextInput
            style={styles.limitInput}
            value={limitAmount}
            onChangeText={handleLimitChange}
            keyboardType="number-pad"
            maxLength={5} // Max 5 digits ($99,999)
            placeholder="500"
            placeholderTextColor="#888888"
          />
        </View>

        <View style={styles.rangeContainer}>
          <Text style={styles.rangeText}>Min: $100</Text>
          <Text style={styles.rangeText}>Max: $5,000</Text>
        </View>

        <Text style={styles.infoText}>
          This limit helps you control your daily card spending. You can change it anytime.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Limit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptySpace: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  limitText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  dollarSign: {
    fontSize: 48,
    fontWeight: '700',
    color: '#40FF00',
    marginRight: 4,
  },
  limitInput: {
    fontSize: 48,
    fontWeight: '700',
    color: '#40FF00',
    padding: 0,
    minWidth: 150,
    textAlign: 'center',
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  rangeText: {
    color: '#888888',
    fontSize: 14,
  },
  infoText: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 48,
    lineHeight: 20,
  },
  buttonContainer: {
    padding: 24,
    paddingBottom: 36,
  },
  saveButton: {
    backgroundColor: '#40FF00',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
});
