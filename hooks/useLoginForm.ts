import { router } from 'expo-router';
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
      role: 'farmer', // Default role for now or could be passed
      device_token: 'dummy_token', // Should be dynamic in real app
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
