import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { api } from '../services';
import { LoginRequest } from '../types/UserTypes';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const loginData: LoginRequest = {
      email,
      password,
      role: 'farmer',
      device_token: 'dummy_token',
      type: 'email',
    };

    try {
      const response = await api.user.login(loginData);
      if (String(response.success).toLowerCase() === 'true') {
        router.replace('/auth/login-success');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, loading, error, handleLogin };
};

export const useForgotPasswordForm = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!phone) {
      setError('Phone number is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.user.forgotPassword({ mobile: phone });
      if (String(response.success).toLowerCase() === 'true') {
        router.push('/auth/verify-otp');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { phone, setPhone, loading, error, handleSendCode };
};

export const useVerifyOtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.user.verifyOtp({ otp: otpValue });
      if (String(response.success).toLowerCase() === 'true') {
        router.push({
          pathname: '/auth/reset-password',
          params: { token: response.token }
        });
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return { otp, setOtp, loading, error, handleVerifyOtp };
};

export const useResetPasswordForm = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.user.resetPassword({
        token: token || '',
        password,
        cpassword: confirmPassword,
      });

      if (String(response.success).toLowerCase() === 'true') {
        router.replace('/auth/login');
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    handleResetPassword,
  };
};
