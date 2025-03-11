import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { Portfolio, Transaction } from './dbTypes';
import { addTransaction } from './dbUtils';

const errorHandler = (
  error: unknown
): { error: { status: number; data: string } } => {
  return {
    error: {
      status: 500,
      data:
        error instanceof Error ? error.message : 'An unknown error occurred.',
    },
  };
};

export const dbApi = createApi({
  reducerPath: 'firestoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Portfolio', 'Watchlist'],
  endpoints: (builder) => ({
    getPortfolio: builder.query<Portfolio, string>({
      async queryFn(userId) {
        try {
          const portfolioDocRef = doc(db, 'users', userId, 'data', 'portfolio');
          const portfolioDoc = await getDoc(portfolioDocRef);
          return {
            data: (portfolioDoc.data() as Portfolio) || {
              totalPrice: 0,
              assets: [],
            },
          };
        } catch (error) {
          return errorHandler(error);
        }
      },
      providesTags: (_, __, userId) => [{ type: 'Portfolio', id: userId }],
    }),
    updatePortfolio: builder.mutation<
      string,
      {
        userId: string | undefined;
        portfolio: Portfolio;
        transaction: Transaction;
      }
    >({
      async queryFn({ userId, portfolio, transaction }) {
        if (!userId) {
          return {
            error: {
              status: 404,
              data: 'User not found',
            },
          };
        }

        try {
          const portfolioDocRef = doc(db, 'users', userId, 'data', 'portfolio');
          const updatedPortfolio = addTransaction(portfolio, transaction);
          await setDoc(portfolioDocRef, updatedPortfolio);
          return { data: 'Portfolio updated successfully' };
        } catch (error) {
          return errorHandler(error);
        }
      },
      invalidatesTags: (_, __, { userId }) => [
        { type: 'Portfolio', id: userId },
      ],
    }),
    getWatchlist: builder.query<string[], string>({
      async queryFn(userId) {
        try {
          const watchlistDocRef = doc(db, 'users', userId, 'data', 'watchlist');
          const watchlistDoc = await getDoc(watchlistDocRef);
          return { data: (watchlistDoc.data()?.tickers as string[]) || [] };
        } catch (error) {
          return errorHandler(error);
        }
      },
      providesTags: (_, __, userId) => [{ type: 'Watchlist', id: userId }],
    }),
    updateWatchlist: builder.mutation<
      string,
      { userId: string; watchlist: string[] }
    >({
      async queryFn({
        userId,
        watchlist,
      }: {
        userId: string;
        watchlist: string[];
      }) {
        try {
          const watchlistDocRef = doc(db, 'users', userId, 'data', 'watchlist');
          await setDoc(watchlistDocRef, { tickers: watchlist });
          return { data: 'Watchlist updated successfully' };
        } catch (error) {
          return errorHandler(error);
        }
      },
      invalidatesTags: (_, __, { userId }) => [
        { type: 'Watchlist', id: userId },
      ],
    }),
  }),
});

export const {
  useGetPortfolioQuery,
  useUpdatePortfolioMutation,
  useGetWatchlistQuery,
  useUpdateWatchlistMutation,
} = dbApi;
