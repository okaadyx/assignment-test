import { router } from 'expo-router';
import React, { useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppButton, SignupHeader } from '../../components';
import { Colors, Spacing, Typography } from '../../constants/Theme';
import { useVerifyOtpForm } from '../../hooks';

export default function VerifyOTPScreen() {
  const {
    otp,
    setOtp,
    loading,
    error,
    handleVerifyOtp
  } = useVerifyOtpForm();

  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    handleVerifyOtp();
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
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Remember your pasword? <Text style={styles.link} onPress={() => router.push('/auth/login')}>Login</Text>
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <AppButton
              title={loading ? "Verifying..." : "Submit"}
              onPress={handleSubmit}
              style={styles.button}
              disabled={loading}
            />

            <TouchableOpacity style={styles.resendContainer}>
              <Text style={styles.resendText}>Resend Code</Text>
            </TouchableOpacity>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  button: {
    marginTop: Spacing.lg,
  },
  resendContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  resendText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    ...Typography.body,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
});
