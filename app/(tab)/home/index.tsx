import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePrivy } from '@privy-io/expo';
import GreetingHeader from '../../../components/GreetingHeader';
import UsdcBalance from '../../../components/UsdcBalance';

// Import the profile icon
const profileIcon = require('../../../assets/prrofile-icon.png');

// Mock data for recent transactions
const RECENT_TRANSACTIONS = [
  {
    id: '1',
    name: 'Starbucks',
    icon: '☕',
    date: 'Today',
    category: 'Food',
    amount: -24.50,
  },
  {
    id: '2',
    name: 'Uber',
    icon: '🚗',
    date: 'Yesterday',
    category: 'Transportation',
    amount: -15.75,
  },
  {
    id: '3',
    name: 'Salary Deposit',
    icon: '💰',
    date: 'Jun 25',
    category: 'Income',
    amount: 2750.00,
  },
  {
    id: '4',
    name: 'Amazon',
    icon: '🛒',
    date: 'Jun 23',
    category: 'Shopping',
    amount: -67.99,
  },
];

// Quick action buttons
const QUICK_ACTIONS = [
  { id: '1', name: 'Send', icon: '📤' },
  { id: '2', name: 'Request', icon: '📥' },
  { id: '3', name: 'Pay', icon: '💳' },
  { id: '4', name: 'Top up', icon: '📈' },
];

export default function HomeScreen() {
  const { user, logout } = usePrivy() as any;
  const insets = useSafeAreaInsets();

  // Get username from email or use a default
  const username = user?.email ? user.email.split('@')[0] : 'User';
  const userInitial = user?.email && user.email.length > 0 ? user.email[0].toUpperCase() : 'U';

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

  // Render individual transaction
  const renderTransaction = (transaction: typeof RECENT_TRANSACTIONS[0]) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionIconContainer}>
        <Text style={styles.transactionIcon}>{transaction.icon}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionName}>{transaction.name}</Text>
        <Text style={styles.transactionCategory}>{transaction.category} • {transaction.date}</Text>
      </View>
      <Text style={[
        styles.transactionAmount,
        transaction.amount > 0 ? styles.positiveAmount : styles.negativeAmount
      ]}>
        {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: insets.top > 0 ? 8 : 4 }]}>
        <GreetingHeader 
          username={username}
          profileImage={profileIcon}
          onProfilePress={handleLogout}
        />
      </View>
      
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section */}
        <UsdcBalance amount={123.45} />

        {/* Quick Action Buttons */}
        <View style={styles.quickActionsContainer}>
          {QUICK_ACTIONS.map(action => (
            <TouchableOpacity key={action.id} style={styles.actionButton} onPress={() => {}}>
              <Text style={styles.actionButtonIcon}>{action.icon}</Text>
              <Text style={styles.actionButtonText}>{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push("/(tab)/profile")}>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          {RECENT_TRANSACTIONS.map(renderTransaction)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: '#fff',
    zIndex: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingTop: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  actionButton: {
    backgroundColor: '#f7f7f7',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '22%',
  },
  actionButtonIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  transactionsContainer: {
    marginBottom: 32,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAllButton: {
    color: '#40ff00',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIcon: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  positiveAmount: {
    color: '#2ecc71',
  },
  negativeAmount: {
    color: '#e74c3c',
  },
}); 