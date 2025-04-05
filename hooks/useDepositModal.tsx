import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoDepositModal from '../components/CryptoDepositModal';

// Define the transaction type
interface Transaction {
  amount: string;
  currency: string;
  timestamp: { date: string; time: string };
  transactionHash?: string;
  chain?: string;
}

// Context interface
interface DepositModalContextType {
  showDepositModal: (transaction: Transaction) => void;
  hideDepositModal: () => void;
  isVisible: boolean;
}

// Create context with default values
const DepositModalContext = createContext<DepositModalContextType>({
  showDepositModal: () => {},
  hideDepositModal: () => {},
  isVisible: false,
});

// Define props for the provider component
interface DepositModalProviderProps {
  children: React.ReactNode;
  walletId?: string;
}

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

export const DepositModalProvider: React.FC<DepositModalProviderProps> = ({ 
  children,
  walletId 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [transactionQueue, setTransactionQueue] = useState<Transaction[]>([]);
  
  // Listen for new transactions (simulated)
  useEffect(() => {
    if (walletId) {
      // This would be replaced with your actual blockchain listener
      const subscribeToTransactions = () => {
        // Simulated listener setup
        console.log(`Subscribed to transactions for wallet: ${walletId}`);
        
        // Return cleanup function
        return () => {
          console.log(`Unsubscribed from transactions for wallet: ${walletId}`);
        };
      };
      
      return subscribeToTransactions();
    }
  }, [walletId]);

  // Process the transaction queue
  useEffect(() => {
    if (transactionQueue.length > 0 && !isVisible) {
      // Take the next transaction from the queue
      const nextTransaction = transactionQueue[0];
      const newQueue = transactionQueue.slice(1);
      
      // Show the modal with this transaction
      setCurrentTransaction(nextTransaction);
      setIsVisible(true);
      setTransactionQueue(newQueue);
    }
  }, [transactionQueue, isVisible]);

  // Function to show the deposit modal
  const showDepositModal = (transaction: Transaction) => {
    if (isVisible) {
      // If modal is already visible, add to queue
      setTransactionQueue([...transactionQueue, transaction]);
    } else {
      // Show immediately if modal is not visible
      setCurrentTransaction(transaction);
      setIsVisible(true);
    }
  };

  // Function to hide the deposit modal
  const hideDepositModal = () => {
    setIsVisible(false);
    setCurrentTransaction(null);
  };

  // Calculate the centered position
  const modalPosition = {
    top: height / 2 - 200, // Approximate modal height / 2
    left: (width - 354) / 2, // Center horizontally (354 is modal width)
  };

  return (
    <DepositModalContext.Provider 
      value={{ 
        showDepositModal, 
        hideDepositModal,
        isVisible 
      }}
    >
      {children}
      
      {currentTransaction && (
        <CryptoDepositModal
          visible={isVisible}
          onClose={hideDepositModal}
          amount={currentTransaction.amount}
          currency={currentTransaction.currency}
          timestamp={currentTransaction.timestamp}
          transactionHash={currentTransaction.transactionHash}
          chain={currentTransaction.chain}
          position={modalPosition}
        />
      )}
    </DepositModalContext.Provider>
  );
};

// Custom hook for using the deposit modal
export const useDepositModal = () => {
  const context = useContext(DepositModalContext);
  
  if (context === undefined) {
    throw new Error('useDepositModal must be used within a DepositModalProvider');
  }
  
  return context;
};

// Example usage in a component:
/*
import { useDepositModal } from '../hooks/useDepositModal';

const MyComponent = () => {
  const { showDepositModal } = useDepositModal();
  
  const handleNewTransaction = () => {
    showDepositModal({
      amount: '500',
      currency: 'USDC',
      timestamp: {
        date: "Apr 14 2024",
        time: "10:05am"
      },
      transactionHash: "0x1234...abcd",
      chain: "Base"
    });
  };
  
  return (
    <Button title="Simulate New Transaction" onPress={handleNewTransaction} />
  );
};
*/ 