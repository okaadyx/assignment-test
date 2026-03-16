import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, AppInput, SignupHeader, SocialLink } from '../../components';
import { Colors, Spacing, Typography } from '../../constants/Theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Implement login logic
    console.log('Login with:', email, password);
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

            <View>
              <AppInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                icon="lock-closed-outline"
              />
              <TouchableOpacity
                style={styles.showHideContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.forgotText}>{showPassword ? 'Hide' : 'Forgot?'}</Text>
              </TouchableOpacity>
            </View>

            <AppButton
              title="Login"
              onPress={handleLogin}
              style={styles.loginButton}
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
  showHideContainer: {
    position: 'absolute',
    right: Spacing.md,
    top: 38,
  },
  forgotText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
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
