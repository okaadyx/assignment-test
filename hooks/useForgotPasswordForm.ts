import { router } from 'expo-router';
import { useState } from 'react';
import { api } from '../services';

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

  return {
    phone,
    setPhone,
    loading,
    error,
    handleSendCode,
  };
};
