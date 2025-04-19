import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  title: string;
  variant?: ButtonVariant;
  showRightArrow?: boolean;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  ({ title, variant = 'primary', showRightArrow = false, style, ...touchableProps }, ref) => {
    const buttonStyle = variant === 'primary' ? styles.primaryButton : styles.secondaryButton;

    const textStyle = styles.buttonText;

    return (
      <TouchableOpacity ref={ref} style={[buttonStyle, style]} {...touchableProps}>
        <Text style={textStyle}>{title}</Text>
        {showRightArrow && (
          <Feather name="arrow-right" size={16} color="#292D32" style={styles.arrowIcon} />
        )}
      </TouchableOpacity>
    );
  }
);

// Container styles for button groups (can be used by parent components)
export const buttonContainerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 0,
    gap: 16,
    width: 354,
    height: 114,
    alignSelf: 'stretch',
  },
});

const styles = StyleSheet.create({
  // Primary button (green)
  primaryButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    width: 354,
    height: 49,
    backgroundColor: '#40FF00',
    borderRadius: 100000,
    alignSelf: 'stretch',
  },
  // Secondary button (white with shadow)
  secondaryButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    width: 354,
    height: 49,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
    borderRadius: 100000,
    alignSelf: 'stretch',
  },
  // Text styling for both buttons
  buttonText: {
    fontFamily: 'SF Pro Text',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17, // 120% of 14px
    textAlign: 'center',
    color: '#000000',
  },
  // Arrow icon styling
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    transform: [{ scaleX: -1 }],
  },
});
