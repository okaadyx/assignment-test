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
import { AppButton, AppInput, SignupHeader, SocialLink } from '../../components';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { useLoginForm } from '../../hooks';

export default function LoginScreen() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin
  } = useLoginForm();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <SignupHeader />

          <View style={styles.header}>
            <Text style={styles.title}>Welcome back!</Text>
            <Text style={styles.subtitle}>
              New here? <Text style={styles.link} onPress={() => router.push('/auth/signup')}>Create Account</Text>
            </Text>
          </View>

          <View style={styles.form}>
            <AppInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
              onForgotPress={() => {
                router.push('/auth/forgot-password');
              }}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            <AppButton
              title={loading ? "Logging in..." : "Login"}
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={loading}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or login with</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialContainer}>
              <SocialLink type="google" onPress={() => { }} />
              <SocialLink type="apple" onPress={() => { }} />
              <SocialLink type="facebook" onPress={() => { }} />
            </View>
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
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  link: {
    color: Colors.primary,
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  loginButton: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.textSecondary,
    ...Typography.caption,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
