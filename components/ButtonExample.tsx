import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';

const ButtonExample: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Standard primary button */}
      <Button
        title="Primary Button"
        className="bg-blue-500"
        onPress={() => console.log('Primary button pressed')}
      />

      {/* Standard secondary button */}
      <Button
        title="Secondary Button"
        className="bg-gray-300"
        onPress={() => console.log('Secondary button pressed')}
      />

      {/* Primary button with custom style */}
      <Button
        title="Button with Custom Style"
        className="bg-blue-500"
        onPress={() => console.log('Primary button pressed')}
      />

      {/* Secondary button with custom style */}
      <Button
        title="Another Custom Style"
        className="bg-gray-300"
        onPress={() => console.log('Secondary button pressed')}
      />

      {/* Custom styled button */}
      <Button
        title="Custom Styled Button"
        style={{
          backgroundColor: '#FF5733',
          height: 60,
          borderRadius: 12,
        }}
        onPress={() => console.log('Custom styled button pressed')}
      />

      {/* Small button */}
      <Button
        title="Small Button"
        style={{
          width: 150,
          height: 40,
          alignSelf: 'center',
        }}
        onPress={() => console.log('Small button pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
    backgroundColor: '#f7f7f7',
  },
});

export default ButtonExample; 