import * as React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import AddMoney from '../../components/AddMoney';
import UsernameModal from '../../components/modal/UsernameModal';
import { Button } from '../../components/Button';
import CryptoDepositModal from '../../components/modal/CryptoDepositModal';

export default function AddMoneyScreen() {
  const router = useRouter();
  const [showDepositModal, setShowDepositModal] = React.useState(false);
  const [showUsernameModal, setShowUsernameModal] = React.useState(false);

  // Show the deposit modal after 3 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowDepositModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleFundedWallet = () => {
    // Hide deposit modal when funded
    setShowDepositModal(false);

    // Show username modal after 3 seconds
    setTimeout(() => {
      setShowUsernameModal(true);
    }, 3000);
  };

  const handleSkip = () => {
    // Hide deposit modal when skipped
    setShowDepositModal(false);

    // Show username modal after 3 seconds
    setTimeout(() => {
      setShowUsernameModal(true);
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowDepositModal(false);

    // Show username modal after 3 seconds
    setTimeout(() => {
      setShowUsernameModal(true);
    }, 3000);
  };

  const handleCloseUsernameModal = () => {
    setShowUsernameModal(false);
  };

  const handleSetUsername = (username: string) => {
    // Save username (implementation needed)
    console.log(`Username set to: ${username}`);
    setShowUsernameModal(false);
    // Navigate to the home tab
    router.push('/(tab)/home');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <AddMoney onFundedWallet={handleFundedWallet} onSkip={handleSkip} />

      <CryptoDepositModal
        visible={showDepositModal}
        onClose={handleCloseModal}
        amount="500"
        currency="USDC"
        timestamp={{
          date: 'Apr 14 2024',
          time: '10:05am',
        }}
        transactionHash="0x1234...abcd"
        chain="Base"
      />

      <UsernameModal
        visible={showUsernameModal}
        onClose={handleCloseUsernameModal}
        onSetUsername={handleSetUsername}
      />
    </View>
  );
}
