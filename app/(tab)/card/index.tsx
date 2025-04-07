import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mock card data
const CARD_DATA = {
  cardHolder: 'John Doe',
  cardNumber: '•••• •••• •••• 4242',
  expiry: '12/25',
  cvv: '•••',
  balance: 2450.65,
  lastTransactions: [
    {
      id: '1',
      merchant: 'Netflix',
      date: 'Today, 9:32 AM',
      amount: -14.99,
      category: 'Subscription',
    },
    {
      id: '2',
      merchant: 'Uber Eats',
      date: 'Yesterday, 8:15 PM',
      amount: -28.45,
      category: 'Food & Dining',
    },
    {
      id: '3',
      merchant: 'Amazon',
      date: 'Apr 5, 2023',
      amount: -67.32,
      category: 'Shopping',
    },
  ],
};

export default function CardScreen() {
  const insets = useSafeAreaInsets();
  const [showCardDetails, setShowCardDetails] = useState(false);

  const toggleCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Card</Text>
          <Text style={styles.subtitle}>Manage your virtual debit card</Text>
        </View>

        {/* Card Display */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardType}>Virtual Debit</Text>
              <Image 
                source={{ uri: 'https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png' }} 
                style={styles.networkLogo}
                resizeMode="contain"
              />
            </View>
            
            <Text style={styles.cardNumber}>
              {showCardDetails ? '4242 4242 4242 4242' : CARD_DATA.cardNumber}
            </Text>
            
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                <Text style={styles.cardValue}>{CARD_DATA.cardHolder}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>EXPIRES</Text>
                <Text style={styles.cardValue}>{CARD_DATA.expiry}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>CVV</Text>
                <Text style={styles.cardValue}>{showCardDetails ? '123' : CARD_DATA.cvv}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.toggleButton} onPress={toggleCardDetails}>
            <Text style={styles.toggleButtonText}>
              {showCardDetails ? 'Hide Details' : 'Show Details'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.controlsHeader}>
            <Text style={styles.sectionTitle}>Card Controls</Text>
          </View>
          
          <View style={styles.controlsGrid}>
            <TouchableOpacity style={styles.controlButton}>
              <View style={styles.controlIcon}>
                <Text style={styles.controlIconText}>🔒</Text>
              </View>
              <Text style={styles.controlText}>Lock Card</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <View style={styles.controlIcon}>
                <Text style={styles.controlIconText}>🌐</Text>
              </View>
              <Text style={styles.controlText}>Online Payments</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <View style={styles.controlIcon}>
                <Text style={styles.controlIconText}>📱</Text>
              </View>
              <Text style={styles.controlText}>Add to Wallet</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton}>
              <View style={styles.controlIcon}>
                <Text style={styles.controlIconText}>🔄</Text>
              </View>
              <Text style={styles.controlText}>Set Limits</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Card Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Recent Card Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {CARD_DATA.lastTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionInfo}>
                <Text style={styles.merchantName}>{transaction.merchant}</Text>
                <Text style={styles.transactionMeta}>
                  {transaction.category} • {transaction.date}
                </Text>
              </View>
              <Text style={styles.transactionAmount}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
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
  cardContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
  },
  networkLogo: {
    width: 60,
    height: 30,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 2,
    marginVertical: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#999',
    fontSize: 10,
    marginBottom: 4,
  },
  cardValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  toggleButton: {
    backgroundColor: '#40ff00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  toggleButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  controlsHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  controlsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  controlIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlIconText: {
    fontSize: 24,
  },
  controlText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    color: '#40ff00',
    fontWeight: '600',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionInfo: {
    flex: 1,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionMeta: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
}); 