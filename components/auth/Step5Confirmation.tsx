import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppButton } from '../core';
import { Colors, Spacing } from '../../constants/Theme';

export const Step5Confirmation: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.successContainer}>
      <View style={styles.checkmarkCircle}>
        <Ionicons name="checkmark" size={60} color={Colors.secondary} />
      </View>
      <Text style={styles.successTitle}>You're all done!</Text>
      <Text style={styles.successDescription}>
        Hang tight! We are currently reviewing your account and will follow up with you in 2-3 business days. In the meantime, you can setup your inventory.
      </Text>
      <AppButton title="Got it!" onPress={() => router.push('/')} style={styles.doneButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  checkmarkCircle: {
    marginBottom: Spacing.xl,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  successDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  doneButton: {
    width: '100%',
    borderRadius: 30,
    height: 50,
  },
});
