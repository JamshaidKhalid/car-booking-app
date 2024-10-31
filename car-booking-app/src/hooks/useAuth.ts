import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useProtectedRoute = (redirectTo: string = '/login') => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(redirectTo);
    }

    if (isAuthenticated && redirectTo === '/login') {
      router.push('/vehicle');
    }
  }, [isAuthenticated, router, redirectTo]);
};
