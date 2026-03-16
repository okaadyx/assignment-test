import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AppInput, AppButton, SocialLink } from '../core';
import { Colors, Spacing } from '../../constants/Theme';
import { StepProps } from '../../types/SignupTypes';

export const Step1Welcome: React.FC<StepProps> = ({ formData, updateFormData, nextStep }) => {
  const router = useRouter();

  return (
    <View>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.socialContainer}>
        <SocialLink type="google" onPress={() => {}} />
        <SocialLink type="apple" onPress={() => {}} />
        <SocialLink type="facebook" onPress={() => {}} />
      </View>
      <Text style={styles.orText}>or signup with</Text>
      
      <AppInput 
        icon="person-outline"
        placeholder="Full Name"
        value={formData.fullName}
        onChangeText={(t) => updateFormData({ fullName: t })}
      />
      <AppInput 
        icon="at-outline"
        placeholder="Email Address"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(t) => updateFormData({ email: t })}
      />
      <AppInput 
        icon="call-outline"
        placeholder="Phone Number"
        value={formData.phone}
        keyboardType="phone-pad"
        onChangeText={(t) => updateFormData({ phone: t })}
      />
      <AppInput 
        icon="lock-closed-outline"
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(t) => updateFormData({ password: t })}
      />
      <AppInput 
        icon="lock-closed-outline"
        placeholder="Re-enter Password"
        secureTextEntry
        value={formData.rePassword}
        onChangeText={(t) => updateFormData({ rePassword: t })}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
        <AppButton title="Continue" onPress={nextStep} style={styles.continueButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: Spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: Colors.text,
  },
  continueButton: {
    width: 180,
    borderRadius: 30,
    height: 50,
  },
});
