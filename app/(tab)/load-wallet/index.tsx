import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Payment method options
const PAYMENT_METHODS = [
  {
    id: '1',
    name: 'Bank Transfer',
    description: 'Transfer funds directly from your bank account',
    icon: '🏦',
    processingTime: 'Instant to 2 business days',
    fee: '0-0.5%',
  },
  {
    id: '2',
    name: 'Cryptocurrency',
    description: 'Deposit USDC, USDT, or other stablecoins',
    icon: '💱',
    processingTime: 'Usually within minutes',
    fee: '0.1-1%',
  },
  {
    id: '3',
    name: 'Credit/Debit Card',
    description: 'Use your Visa, Mastercard, or Amex card',
    icon: '💳',
    processingTime: 'Instant',
    fee: '1.5-3%',
  },
  {
    id: '4',
    name: 'Mobile Payment',
    description: 'Apple Pay, Google Pay, and other mobile wallets',
    icon: '📱',
    processingTime: 'Instant',
    fee: '0.5-2%',
  },
];

export default function LoadWalletScreen() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Load Wallet</Text>
          <Text style={styles.subtitle}>Choose a payment method to add funds to your wallet</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.methodsContainer}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity key={method.id} style={styles.methodCard}>
              <View style={styles.methodIconContainer}>
                <Text style={styles.methodIcon}>{method.icon}</Text>
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDescription}>{method.description}</Text>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodDetail}>Processing: {method.processingTime}</Text>
                  <Text style={styles.methodDetail}>Fee: {method.fee}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Deposits Section */}
        <View style={styles.recentDepositsContainer}>
          <Text style={styles.sectionTitle}>Recent Deposits</Text>
          
          {/* Empty state */}
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateIcon}>📭</Text>
            <Text style={styles.emptyStateText}>No recent deposits</Text>
            <Text style={styles.emptyStateSubtext}>Your deposit history will appear here</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 200, // Extra padding for bottom navigation
  },
  header: {
    marginVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  methodsContainer: {
    marginBottom: 24,
  },
  methodCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  methodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodIcon: {
    fontSize: 24,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  methodDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  methodDetail: {
    fontSize: 12,
    color: '#888',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  recentDepositsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#888',
  },
}); 