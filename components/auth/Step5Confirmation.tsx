import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppButton } from '../core';
import { Colors, Spacing, Typography } from '../../constants/Theme';

export const Step5Confirmation: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.successContent}>
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-sharp" size={100} color={Colors.secondary} />
        </View>
        <Text style={styles.title}>You're all done!</Text>
        <Text style={styles.description}>
          Hang tight! We are currently reviewing your account and will follow up with you in 2-3 business days. In the meantime, you can setup your inventory.
        </Text>
      </View>
      <AppButton 
        title="Got it!" 
        onPress={() => router.push('/auth/login')} 
        style={styles.doneButton} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: Spacing.xl,
    minHeight: 500,
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xxl,
  },
  checkmarkContainer: {
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  doneButton: {
    width: '100%',
    borderRadius: 30,
    height: 50,
  },
});
