import { useState } from 'react';
import { api } from '../services';
import { router, useLocalSearchParams } from 'expo-router';

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
