import { useMemo } from 'react';
import { selectIsUserLoading, selectUser } from '@/store/auth/auth.slice';
import { useGetWatchlistQuery } from '@/store/db/db.api';
import { useAppSelector } from '../';

export const useGetWatchlist = (): {
  watchlist: string[];
  watchlistError: string | undefined;
  watchlistLoading: boolean;
} => {
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  const { data, error, isLoading } = useGetWatchlistQuery(user?.uid || '', {
    skip: !user?.uid,
  });

  const watchlist = useMemo(() => {
    return data || [];
  }, [data]);

  return {
    watchlist,
    watchlistError: error ? 'An error occurred while retrieving the watchlist data.' : undefined,
    watchlistLoading: isLoading || isUserLoading,
  };
};
