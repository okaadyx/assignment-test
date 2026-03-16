import { router } from 'expo-router';
import { useState } from 'react';

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
      router.push('/auth/verify-otp');

    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return {
    phone,
    setPhone,
    loading,
    error,
    handleSendCode,
  };
};
