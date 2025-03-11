import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { coinloreReducer } from './coinlore/coinlore.slice';
import { portfolioReducer } from './portfolio/portfolio.slice';
import { authReducer } from './auth/auth.slice';
import { coinloreApi } from './coinlore/coinlore.api';
import { authApi } from './auth/auth.api';
import { dbApi } from './db/db.api';

export const store = configureStore({
  reducer: {
    [coinloreApi.reducerPath]: coinloreApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [dbApi.reducerPath]: dbApi.reducer,
    coinlore: coinloreReducer,
    portfolio: portfolioReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(coinloreApi.middleware)
      .concat(authApi.middleware)
      .concat(dbApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
