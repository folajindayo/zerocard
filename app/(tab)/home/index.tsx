import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usePrivy } from '@privy-io/expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GreetingHeader from '../../../components/GreetingHeader';
import CardModule from '../../../components/CardModule';
import CardStatusComponent from '../../../components/CardStatus';
import UsernameModal from '../../../components/modal/UsernameModal';
import AndroidUsernameModal from '../../../components/AndroidUsernameModal';
import CardControls from '../../../components/CardControls';
import TransactionItem from '../../../components/TransactionItem';
import CardTypeModal from '../../../components/modal/CardTypeModal';
import SpendingLimitDialog from '../../../components/SpendingLimitDialog';
import SpendingLimitToast from '../../../components/SpendingLimitToast';
import WithdrawalToast from '../../../components/WithdrawalToast';
// Import both Tracking Modals
import TrackingStatusModal from '../../../components/modal/TrackingStatusModal'; 
// Define TrackingStatus type locally as it's defined within modals
type TrackingStatus = 'accepted' | 'picked_up' | 'on_delivery' | 'delivered';

// Import mockdata
import mockData from '../../../assets/mockdata.json';

// Import the profile icon
const profileIcon = require('../../../assets/prrofile-icon.png');

// User onboarding stages
type UserStage = 'new_user' | 'ordered_card' | 'activated_card' | 'has_transactions';

// Generate random transactions
const generateRandomTransactions = () => {
  const transactionTypes = ['deposit', 'spend', 'withdraw'] as const;
  const merchantNames = [
    'Starbucks',
    'Uber',
    'Amazon',
    'Netflix',
    'Walmart',
    'Target',
    'Apple Store',
    'Spotify',
    'DoorDash',
    'Nike',
    "Trader Joe's",
    'Whole Foods',
    'Best Buy',
    'GameStop',
  ];
  const dates = ['Today', 'Yesterday', 'Jun 28', 'Jun 27', 'Jun 25', 'Jun 23', 'Jun 21'];
  const times = ['9:30am', '10:45am', '1:15pm', '3:30pm', '6:45pm', '8:20pm'];
  const categories = [
    'Food',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Groceries',
    'Technology',
  ];

  // Random number between min and max
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Generate 5-8 random transactions
  const count = randomInt(5, 8);
  const transactions = [];

  for (let i = 0; i < count; i++) {
    const type = transactionTypes[randomInt(0, transactionTypes.length - 1)];

    const transaction = {
      id: `${i + 1}`,
      type,
      name: merchantNames[randomInt(0, merchantNames.length - 1)],
      date: dates[randomInt(0, dates.length - 1)],
      time: times[randomInt(0, times.length - 1)],
      amount:
        type === 'deposit'
          ? parseFloat((randomInt(50, 3000) + Math.random()).toFixed(2))
          : parseFloat((randomInt(5, 500) + Math.random()).toFixed(2)),
      currency: 'USDC',
      category: categories[randomInt(0, categories.length - 1)],
    };

    transactions.push(transaction);
  }

  return transactions;
};

// Mock transaction data with type
const mockTransactions = generateRandomTransactions();

export default function HomeScreen() {
  const { user, logout } = usePrivy() as any;
  const insets = useSafeAreaInsets();
  const {
    showLimitToast,
    showWithdrawalToast,
    amount: toastAmount,
    address: toastAddress,
  } = useLocalSearchParams<{
    showLimitToast?: string;
    showWithdrawalToast?: string;
    amount?: string;
    address?: string;
  }>();

  // State for user's stage in the onboarding process
  const [userStage, setUserStage] = useState<UserStage>('new_user');

  // State for username modal
  const [usernameModalVisible, setUsernameModalVisible] = useState(false);
  const [username, setUsername] = useState<string>('');

  // State for Android username modal
  const [androidUsernameModalVisible, setAndroidUsernameModalVisible] = useState(false);

  // State for card type modal
  const [cardTypeModalVisible, setCardTypeModalVisible] = useState(false);
  
  // State for tracking status modal visibility
  const [trackingStatusModalVisible, setTrackingStatusModalVisible] = useState(false);

  // State for transactions
  const [transactions, setTransactions] = useState(mockTransactions);

  // State for toast
  const [toastVisible, setToastVisible] = useState(false);
  const [withdrawalToastVisible, setWithdrawalToastVisible] = useState(false);

  // Show toast notification if the showLimitToast param is present
  useEffect(() => {
    if (showLimitToast === 'true') {
      setToastVisible(true);
    }
  }, [showLimitToast]);

  // Show withdrawal toast if param present
  useEffect(() => {
    if (showWithdrawalToast === 'true') {
      setWithdrawalToastVisible(true);
    }
  }, [showWithdrawalToast]);

  // Load saved state from AsyncStorage
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        // Check if user is verified
        const userVerified = await AsyncStorage.getItem('user_verified');
        const cardOrdered = await AsyncStorage.getItem('card_ordered');
        const savedUsername = await AsyncStorage.getItem('username');

        // If we have a saved username, use it
        if (savedUsername) {
          setUsername(savedUsername);
        }

        // If card was ordered, update the stage
        if (cardOrdered === 'true') {
          setUserStage('ordered_card');
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };

    loadSavedState();
  }, []);

  // Get username from state or email as fallback
  const displayName = username || (user?.email ? user.email.split('@')[0] : '');
  const userInitial = displayName && displayName.length > 0 ? displayName[0].toUpperCase() : 'U';

  // On Android, show Android username modal when in new_user stage
  useEffect(() => {
    if (Platform.OS === 'android' && userStage === 'new_user' && !username) {
      setAndroidUsernameModalVisible(true);
    }
  }, [userStage, username]);

  // Open username modal automatically for new users after 1 second (iOS only)
  useEffect(() => {
    if (userStage === 'new_user' && Platform.OS === 'ios' && !username) {
      const timer = setTimeout(() => {
        setUsernameModalVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [userStage, username]);

  // Handle username setup
  const handleSetUsername = async (newUsername: string) => {
    setUsername(newUsername);
    setUsernameModalVisible(false);
    setAndroidUsernameModalVisible(false);

    // Save username to AsyncStorage
    try {
      await AsyncStorage.setItem('username', newUsername);
      await AsyncStorage.setItem('user_verified', 'true');
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  // Handle profile press - on Android, show username modal
  const handleProfilePress = () => {
    if (Platform.OS === 'android') {
      setAndroidUsernameModalVisible(true);
    } else {
      // On iOS, profile press logs out
      handleLogout();
    }
  };

  // If no user, redirect to root
  if (!user) {
    return <Redirect href="/" />;
  }

  const handleLogout = async () => {
    try {
      // Clear any saved state on logout
      await AsyncStorage.multiRemove([
        'username',
        'user_verified',
        'card_ordered',
        'identity_type',
      ]);
      await logout();
      // No need for navigation here - the Redirect will handle it
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handlers for card status actions
  const handleOrderCard = () => {
    // Show the card type selection modal
    setCardTypeModalVisible(true);
  };

  const handleSelectCardType = async (cardType: 'physical' | 'contactless') => {
    // In a real app, this would call an API to order the selected card type
    console.log(`${cardType} card ordered`);
    setUserStage('ordered_card');

    // Save ordered state
    try {
      await AsyncStorage.setItem('card_ordered', 'true');
    } catch (error) {
      console.error('Error saving card ordered state:', error);
    }
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
    // Only open the modal on iOS
    if (Platform.OS === 'ios') {
      setTrackingStatusModalVisible(true);
    } else {
      // Optionally, add Android-specific behavior here if needed later
      console.log('Check status does nothing on Android for now.');
    }
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
      // Generate new random transactions when showing transactions
      setTransactions(generateRandomTransactions());
    } else if (userStage === 'has_transactions') {
      setUserStage('activated_card');
    }
  };

  // Handle spending limit dialog press
  const handleSpendingLimitPress = () => {
    console.log('Navigating to spending limit screen');
    router.push('/(app)/spending-limit');
  };

  // Get current tracking status based on user stage (for modal)
  const getCurrentTrackingStatus = (): TrackingStatus => {
    // This logic might need refinement based on actual app states
    if (userStage === 'ordered_card') {
      return 'picked_up'; // Or 'on_delivery' based on more detailed status
    }
    if (userStage === 'activated_card' || userStage === 'has_transactions') {
      return 'delivered'; // Assuming delivered if activated
    }
    return 'accepted'; // Default if new_user or just ordered
  };

  // Generate estimated delivery date (example: 5 days from now)
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Toast notification */}
      <SpendingLimitToast visible={toastVisible} onDismiss={() => setToastVisible(false)} />

      {/* Username Modals (Platform specific) */}
      {Platform.OS === 'ios' ? (
        <UsernameModal
          visible={usernameModalVisible}
          onClose={() => setUsernameModalVisible(false)}
          onSetUsername={handleSetUsername}
          initialUsername={username}
        />
      ) : (
        <AndroidUsernameModal
          visible={androidUsernameModalVisible}
          onClose={() => setAndroidUsernameModalVisible(false)}
          onSetUsername={handleSetUsername}
          initialUsername={username}
        />
      )}

      {/* Card Type Modal (Common) */}
      <CardTypeModal
        visible={cardTypeModalVisible}
        onClose={() => setCardTypeModalVisible(false)}
        onSelectCardType={handleSelectCardType}
      />
      
      {/* Tracking Status Modal (Now common) */}
      <TrackingStatusModal
        visible={trackingStatusModalVisible}
        onClose={() => setTrackingStatusModalVisible(false)}
        estimatedDeliveryDate={getEstimatedDeliveryDate()}
        currentStatus={getCurrentTrackingStatus()}
      />

      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: insets.top > 0 ? 8 : 4 }]}>
        <GreetingHeader
          username={displayName}
          profileImage={profileIcon}
          onProfilePress={handleProfilePress}
        />
      </View>

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Card Module */}
        <View style={styles.cardModuleContainer}>
          <CardModule />
        </View>

        {/* Card Status - Only show for new users and users who ordered a card */}
        {(userStage === 'new_user' || userStage === 'ordered_card') && (
          <View style={styles.cardStatusContainer}>
            <CardStatusComponent
              status={userStage === 'new_user' ? 'not_found' : 'ordered'}
              onPrimaryButtonPress={
                userStage === 'new_user'
                  ? handleOrderCard
                  : () => router.push('/(app)/card-activation/qr-scanner')
              }
              onSecondaryButtonPress={
                userStage === 'new_user' ? handleLoadWallet : handleCheckStatus
              }
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

        {/* Spending Limit Dialog - Only show for users with activated cards */}
        {(userStage === 'activated_card' || userStage === 'has_transactions') && (
          <View style={styles.spendingLimitContainer}>
            <SpendingLimitDialog onPress={handleSpendingLimitPress} />
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
            {userStage === 'has_transactions'
              ? transactions.map((transaction) => (
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
              : renderEmptyTransactions()}

            {/* Button to toggle transaction state */}
            <TouchableOpacity style={styles.toggleButton} onPress={toggleTransactionState}>
              <Text style={styles.toggleButtonText}>
                {userStage === 'activated_card' ? 'Simulate Transactions' : 'Clear Transactions'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Withdrawal success toast overlay */}
      {withdrawalToastVisible && toastAmount && toastAddress && (
        <WithdrawalToast
          amount={toastAmount as string}
          address={toastAddress as string}
          onHide={() => setWithdrawalToastVisible(false)}
        />
      )}
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
    paddingBottom: 100,
  },
  cardModuleContainer: {
    // marginTop: 16, // Remove this line
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
    marginTop: Platform.select({
      android: 8,
      ios: 8,
      default: 8,
    }),
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
    marginTop: Platform.select({
      android: 32,
      ios: 16,
      default: 8,
    }),
    marginBottom: Platform.select({
      android: 12,
      ios: 16,
      default: 8,
    }),
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
  spendingLimitContainer: {
    marginTop: 0, // 16px gap from CardControls
    marginBottom: 16,
  },
});
