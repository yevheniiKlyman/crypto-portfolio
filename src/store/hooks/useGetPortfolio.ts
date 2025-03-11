import { useMemo } from 'react';
import { selectIsUserLoading, selectUser } from '@/store/auth/auth.slice';
import { useGetPortfolioQuery } from '@/store/db/db.api';
import { useAppSelector } from '../';
import { Portfolio } from '../db/dbTypes';

export const useGetPortfolio = (): {
  portfolio: Portfolio;
  portfolioError: string | undefined;
  portfolioLoading: boolean;
} => {
  const user = useAppSelector(selectUser);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  const { data, error, isLoading } = useGetPortfolioQuery(user?.uid || '', {
    skip: !user?.uid,
  });

  const portfolio = useMemo(() => {
    return {
      assets: data?.assets || [],
      totalPrice: data?.totalPrice || 0,
    };
  }, [data]);

  return {
    portfolio,
    portfolioError: error ? 'An error occurred while retrieving the portfolio data.' : undefined,
    portfolioLoading: isLoading || isUserLoading,
  };
};
