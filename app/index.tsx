import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const token = await SecureStore.getItemAsync('token');
        setIsAuthenticated(!!token);
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);
  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/auth/login-success" />;
  }

  return <Redirect href="/onboarding" />;
}
