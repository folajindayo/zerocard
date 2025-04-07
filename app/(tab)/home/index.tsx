import React, { useState, useEffect } from 'react';
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
import CardModule from '../../../components/CardModule';
import CardStatusComponent from '../../../components/CardStatus';
import UsernameModal from '../../../components/UsernameModal';
import CardControls from '../../../components/CardControls';
import TransactionItem from '../../../components/TransactionItem';

// Import mockdata
import mockData from '../../../assets/mockdata.json';

// Import the profile icon
const profileIcon = require('../../../assets/prrofile-icon.png');

// User onboarding stages
type UserStage = 'new_user' | 'ordered_card' | 'activated_card' | 'has_transactions';

// Mock transaction data with type
const mockTransactions = [
  {
    id: '1',
    type: 'spend' as const,
    name: 'Starbucks',
    date: 'Today',
    time: '9:30am',
    amount: 24.50,
    currency: 'USDC',
    category: 'Food'
  },
  {
    id: '2',
    type: 'spend' as const,
    name: 'Uber',
    date: 'Yesterday',
    time: '6:45pm',
    amount: 15.75,
    currency: 'USDC',
    category: 'Transportation'
  },
  {
    id: '3',
    type: 'deposit' as const,
    name: 'Salary Deposit',
    date: 'Jun 25',
    time: '10:00am',
    amount: 2750.00,
    currency: 'USDC',
    category: 'Income'
  },
  {
    id: '4',
    type: 'spend' as const,
    name: 'Amazon',
    date: 'Jun 23',
    time: '2:20pm',
    amount: 67.99,
    currency: 'USDC',
    category: 'Shopping'
  }
];

export default function HomeScreen() {
  const { user, logout } = usePrivy() as any;
  const insets = useSafeAreaInsets();
  
  // State for user's stage in the onboarding process
  const [userStage, setUserStage] = useState<UserStage>('new_user');
  
  // State for username modal
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [username, setUsername] = useState<string>('');

  // Get username from state or email as fallback
  const displayName = username || (user?.email ? user.email.split('@')[0] : '');
  const userInitial = displayName && displayName.length > 0 ? displayName[0].toUpperCase() : 'U';

  // Open username modal automatically for new users after 1 second
  useEffect(() => {
    if (userStage === 'new_user') {
      const timer = setTimeout(() => {
        setUsernameModalVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [userStage]);
  
  // Handle username setup
  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
    setUsernameModalVisible(false);
    // In a real app, you would save this to user profile/backend
  };

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

  // Handlers for card status actions
  const handleOrderCard = () => {
    // In a real app, this would call an API to order a card
    console.log('Order card pressed');
    setUserStage('ordered_card');
  };

  const handleLoadWallet = () => {
    console.log('Load wallet pressed');
  };

  const handleActivateCard = () => {
    // In a real app, this would call an API to activate the card
    console.log('Activate card pressed');
    setUserStage('activated_card');
  };

  const handleCheckStatus = () => {
    console.log('Check status pressed');
  };

  // Card number based on state
  const getCardNumber = () => {
    return mockData.userStages[userStage]?.cardNumber || 'No card found';
  };

  // Get expiry date based on state
  const getExpiryDate = () => {
    return mockData.userStages[userStage]?.expiryDate || '··/··';
  };

  // Get wallet address based on state
  const getWalletAddress = () => {
    return mockData.userStages[userStage]?.walletAddress || '········';
  };

  // Render empty transactions state
  const renderEmptyTransactions = () => (
    <View style={styles.emptyTransactionsContainer}>
      <Text style={styles.emptyTransactionsText}>You have no transactions</Text>
    </View>
  );

  // Toggle between transaction states
  const toggleTransactionState = () => {
    if (userStage === 'activated_card') {
      setUserStage('has_transactions');
    } else if (userStage === 'has_transactions') {
      setUserStage('activated_card');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Username Modal */}
      <UsernameModal
        visible={usernameModalVisible}
        onClose={() => setUsernameModalVisible(false)}
        onSetUsername={handleSetUsername}
        initialUsername={username}
      />
      
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: insets.top > 0 ? 8 : 4 }]}>
        <GreetingHeader 
          username={displayName}
          profileImage={profileIcon}
          onProfilePress={handleLogout}
        />
      </View>
      
      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Section - show 0 for new users */}
        <UsdcBalance amount={userStage === 'new_user' ? 0 : mockData.user.balance} />

        {/* Card Module */}
        <View style={styles.cardModuleContainer}>
          <CardModule 
            cardNumber={getCardNumber()}
            cardHolderName={displayName || 'Your Name Here'}
            expiryDate={getExpiryDate()}
            walletAddress={getWalletAddress()}
          />
        </View>
        
        {/* Card Status - Only show for new users and users who ordered a card */}
        {(userStage === 'new_user' || userStage === 'ordered_card') && (
          <View style={styles.cardStatusContainer}>
            <CardStatusComponent 
              status={userStage === 'new_user' ? 'not_found' : 'ordered'}
              onPrimaryButtonPress={userStage === 'new_user' ? handleOrderCard : handleActivateCard}
              onSecondaryButtonPress={userStage === 'new_user' ? handleLoadWallet : handleCheckStatus}
            />
          </View>
        )}
        
        {/* Card Controls - Only show for users with activated cards */}
        {(userStage === 'activated_card' || userStage === 'has_transactions') && (
          <View style={styles.cardControlsContainer}>
            <CardControls 
              onLoadCard={() => {
                console.log('Load card pressed');
              }}
              onFreezeCard={() => {
                console.log('Freeze card pressed');
              }}
            />
          </View>
        )}

        {/* Transactions Section - Only show for users with activated cards */}
        {(userStage === 'activated_card' || userStage === 'has_transactions') && (
          <View style={styles.transactionsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <Text style={styles.sectionAction}>View All</Text>
            </View>
            
            {/* Show transactions or empty state based on user stage */}
            {userStage === 'has_transactions' ? (
              mockTransactions.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  id={transaction.id}
                  type={transaction.type}
                  name={transaction.name}
                  amount={transaction.amount}
                  date={transaction.date}
                  time={transaction.time}
                  currency={transaction.currency}
                  category={transaction.category}
                />
              ))
            ) : (
              renderEmptyTransactions()
            )}
            
            {/* Button to toggle transaction state */}
            <TouchableOpacity 
              style={styles.toggleButton} 
              onPress={toggleTransactionState}
            >
              <Text style={styles.toggleButtonText}>
                {userStage === 'activated_card' 
                  ? 'Simulate Transactions' 
                  : 'Clear Transactions'
                }
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  fixedHeader: {
    backgroundColor: '#f7f7f7',
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
  cardModuleContainer: {
    marginTop: 16,
    height: 244, // Providing enough height for the stacked cards
  },
  transactionsContainer: {
    marginTop: 24, // Increased from 16px to 24px from card controls
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'SF Pro Text',
    fontSize: 18,
    fontWeight: '500', // Changed from 600 to 500
  },
  sectionAction: {
    fontFamily: 'SF Pro Text',
    fontSize: 14, // Changed from default to 14px
    color: '#838383', // Changed from #40ff00 to #838383
    fontWeight: '500',
  },
  cardStatusContainer: {
    marginTop: 8, // 16px gap between CardModule and CardStatus
    marginBottom: 8,
  },
  emptyTransactionsContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTransactionsText: {
    fontFamily: 'SF Pro Text',
    fontSize: 16,
    color: '#787878',
    textAlign: 'center',
  },
  cardControlsContainer: {
    marginTop: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  toggleButton: {
    marginTop: 16,
    backgroundColor: '#38E100',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  toggleButtonText: {
    fontFamily: 'SF Pro Text',
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
}); 