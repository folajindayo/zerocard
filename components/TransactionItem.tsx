import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

// Transaction types
type TransactionType = 'deposit' | 'spend';

interface TransactionItemProps {
  id: string;
  type: TransactionType;
  name: string;
  amount: number;
  date: string;
  time?: string;
  currency?: string;
  category?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  name,
  amount,
  date,
  time = '10:05am',
  currency = 'USDC',
  category,
}) => {
  // USDC icon SVG
  const usdcSvg = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.50041 16.4288C12.7978 16.4288 16.2546 12.8942 16.2546 8.50001C16.2546 4.10586 12.7978 0.571198 8.50041 0.571198C4.20303 0.571198 0.746216 4.10586 0.746216 8.50001C0.746216 12.8942 4.20303 16.4288 8.50041 16.4288Z" fill="#2775CA"/>
<path d="M10.6328 9.75514C10.6328 8.59912 9.95434 8.20268 8.59736 8.03697C7.62808 7.90455 7.43423 7.64053 7.43423 7.17828C7.43423 6.71603 7.75758 6.41869 8.4035 6.41869C8.98507 6.41869 9.30842 6.61691 9.4697 7.11247C9.50227 7.21158 9.5992 7.27739 9.69613 7.27739H10.2133C10.3428 7.27739 10.4398 7.17828 10.4398 7.04586V7.01256C10.3103 6.28549 9.72869 5.72413 8.98584 5.65832V4.86544C8.98584 4.73303 8.88892 4.63392 8.72763 4.60141H8.24299C8.1135 4.60141 8.01657 4.70052 7.98478 4.86544V5.62502C7.0155 5.75743 6.40137 6.4179 6.40137 7.24408C6.40137 8.3343 7.04729 8.76404 8.40428 8.92896C9.30919 9.09388 9.59997 9.2921 9.59997 9.82095C9.59997 10.3498 9.14791 10.7129 8.53377 10.7129C7.69399 10.7129 7.40321 10.3498 7.30628 9.85425C7.27372 9.72184 7.17679 9.65603 7.07986 9.65603H6.53087C6.40137 9.65603 6.30444 9.75514 6.30444 9.88755V9.92085C6.43394 10.747 6.95037 11.3417 8.01657 11.5066V12.2995C8.01657 12.4319 8.1135 12.531 8.27478 12.5635H8.75942C8.88892 12.5635 8.98584 12.4644 9.01764 12.2995V11.5066C9.98613 11.3409 10.6328 10.6471 10.6328 9.75514Z" fill="white"/>
<path d="M6.85257 13.224C4.33245 12.2987 3.03983 9.42451 3.97731 6.88095C4.46195 5.49341 5.52815 4.4365 6.85257 3.94094C6.98206 3.87514 7.04642 3.77603 7.04642 3.61031V3.14806C7.04642 3.01565 6.98206 2.91654 6.85257 2.88403C6.82 2.88403 6.75564 2.88403 6.72307 2.91733C3.65396 3.90844 1.97363 7.24488 2.9429 10.3839C3.52447 12.2337 4.91402 13.6545 6.72307 14.2492C6.85257 14.315 6.98129 14.2492 7.01385 14.1168C7.04642 14.0835 7.04642 14.051 7.04642 13.9844V13.5221C7.04642 13.4222 6.94949 13.2906 6.85257 13.224ZM10.2768 2.91654C10.1473 2.85073 10.0186 2.91654 9.98603 3.04895C9.95347 3.08225 9.95347 3.11476 9.95347 3.18136V3.64361C9.95347 3.77602 10.0504 3.90764 10.1473 3.97425C12.6674 4.89954 13.9601 7.77374 13.0226 10.3173C12.5379 11.7048 11.4717 12.7618 10.1473 13.2573C10.0178 13.3231 9.95347 13.4222 9.95347 13.5879V14.0502C9.95347 14.1826 10.0178 14.2817 10.1473 14.3142C10.1799 14.3142 10.2442 14.3142 10.2768 14.2809C13.3459 13.2898 15.0263 9.95337 14.057 6.81435C13.4754 4.93205 12.0541 3.5112 10.2768 2.91654Z" fill="white"/>
</svg>`;

  // Received Icon SVG
  const receivedIconSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.00524902" width="16" height="16" rx="8" fill="white"/>
<path d="M7.99967 1.33862C4.31967 1.33862 1.33301 4.32529 1.33301 8.00529C1.33301 11.6853 4.31967 14.672 7.99967 14.672C11.6797 14.672 14.6663 11.6853 14.6663 8.00529C14.6663 4.32529 11.6797 1.33862 7.99967 1.33862ZM11.6863 5.02529L6.53967 10.172H8.55301C8.82634 10.172 9.05301 10.3986 9.05301 10.672C9.05301 10.9453 8.82634 11.172 8.55301 11.172H5.33301C5.05967 11.172 4.83301 10.9453 4.83301 10.672V7.45196C4.83301 7.17862 5.05967 6.95196 5.33301 6.95196C5.60634 6.95196 5.83301 7.17862 5.83301 7.45196V9.46529L10.9797 4.31862C11.0797 4.21862 11.2063 4.17196 11.333 4.17196C11.4597 4.17196 11.5863 4.21862 11.6863 4.31862C11.8797 4.51196 11.8797 4.83196 11.6863 5.02529Z" fill="#2FBA00"/>
</svg>`;

  // Send Icon SVG
  const sendIconSvg = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.1401 3.91842L7.11012 6.91842C1.04012 8.94842 1.04012 12.2584 7.11012 14.2784L9.79012 15.1684L10.6801 17.8484C12.7001 23.9184 16.0201 23.9184 18.0401 17.8484L21.0501 8.82842C22.3901 4.77842 20.1901 2.56842 16.1401 3.91842ZM16.4601 9.29842L12.6601 13.1184C12.5101 13.2684 12.3201 13.3384 12.1301 13.3384C11.9401 13.3384 11.7501 13.2684 11.6001 13.1184C11.3101 12.8284 11.3101 12.3484 11.6001 12.0584L15.4001 8.23842C15.6901 7.94842 16.1701 7.94842 16.4601 8.23842C16.7501 8.52842 16.7501 9.00842 16.4601 9.29842Z" fill="#292D32"/>
</svg>`;

  // Determine UI based on transaction type
  const isDeposit = type === 'deposit';
  const title = isDeposit ? `Received ${amount} ${currency}` : `Spent ${amount} ${currency}`;
  const amountText = isDeposit ? `+${amount} ${currency}` : `-₦${(amount * 1500).toFixed(2)}`;
  const iconSvg = isDeposit ? (
    <View style={styles.depositIconGroup}>
      <SvgXml xml={usdcSvg} width={35} height={35} style={styles.usdcIcon} />
      <View style={styles.receivedIconContainer}>
        <SvgXml xml={receivedIconSvg} width={16} height={16} />
      </View>
    </View>
  ) : (
    <View style={styles.spendIconContainer}>
      <SvgXml xml={sendIconSvg} width={24} height={24} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {/* Icon */}
        {iconSvg}
        
        {/* Transaction details */}
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>{date}</Text>
            {time && <Text style={styles.metaText}>{time}</Text>}
          </View>
        </View>
      </View>
      
      {/* Amount tag */}
      <View style={[
        styles.amountTag,
        isDeposit ? styles.depositAmountTag : styles.spendAmountTag
      ]}>
        <Text style={styles.amountText}>{amountText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  depositIconGroup: {
    position: 'relative',
    width: 37,
    height: 38,
  },
  usdcIcon: {
    position: 'absolute',
    left: 0,
    top: 5,
  },
  receivedIconContainer: {
    position: 'absolute',
    width: 16,
    height: 16,
    left: 21,
    top: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  spendIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#ECECEC',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19.2,
    color: '#121212',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  metaText: {
    fontFamily: 'SF Pro Text',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 23,
    color: '#838383',
  },
  amountTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 10000,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  depositAmountTag: {
    borderColor: '#38E100',
  },
  spendAmountTag: {
    borderColor: '#BCBCBC',
  },
  amountText: {
    fontFamily: 'SF Pro Text',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: '#000000',
  },
});

export default TransactionItem; 