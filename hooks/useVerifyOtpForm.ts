import { useState } from 'react';
import { api } from '../services';
import { router } from 'expo-router';

export const useVerifyOtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');
    if (otpValue.length < 5) {
      setError('Please enter the full 5-digit code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.user.verifyOtp({ otp: otpValue });
      if (String(response.success).toLowerCase() === 'true') {
        // Store token if needed for reset password
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
