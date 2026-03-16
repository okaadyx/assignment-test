import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../constants/Theme';

interface SignupHeaderProps {
  step?: number;
}

export const SignupHeader: React.FC<SignupHeaderProps> = ({ step }) => (
  <View style={styles.header}>
    <Text style={styles.logoText}>FarmerEats</Text>
    {step !== undefined && (
      <Text style={styles.stepIndicator}>Signup {step === 5 ? 'Done' : `${step} of 4`}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingVertical: Spacing.lg,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  stepIndicator: {
    fontSize: 12,
    color: '#999',
    marginTop: Spacing.xl,
    fontWeight: '500',
  },
});
