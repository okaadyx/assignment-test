import { router } from 'expo-router';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, AppInput, SignupHeader } from '../../components';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { useResetPasswordForm } from '../../hooks';

export default function ResetPasswordScreen() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleResetPassword
  } = useResetPasswordForm();

  const handleSubmit = () => {
    handleResetPassword();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <SignupHeader />

          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Remember your password? <Text style={styles.link} onPress={() => router.push('/auth/login')}>Login</Text>
            </Text>
          </View>

          <View style={styles.form}>
            <AppInput
              placeholder="New Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <AppInput
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <AppButton
              title={loading ? "Resetting..." : "Submit"}
              onPress={handleSubmit}
              style={styles.button}
              disabled={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingTop: 0,
  },
  header: {
    marginBottom: Spacing.xxl,
    marginTop: Spacing.xl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
    fontSize: 32,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontSize: 14,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  button: {
    marginTop: Spacing.lg,
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});
