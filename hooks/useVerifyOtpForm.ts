import { router } from 'expo-router';
import { useState } from 'react';
import { api } from '../services';

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

  return {
    otp,
    setOtp,
    loading,
    error,
    handleVerifyOtp,
  };
};
