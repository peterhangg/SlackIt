import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetMeQuery } from '../generated/graphql';

export const useIsAuthenticated = () => {
  const { data, loading } = useGetMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.getMe) {
      router.push('/login');
    }
  }, [loading, data, router]);
};
