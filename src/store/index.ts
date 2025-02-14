import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { coinloreApi } from './coinlore/coinlore.api';
import { coinloreReducer } from './coinlore/coinlore.slice';
import { portfolioReducer } from './portfolio/portfolio.slice';

export const store = configureStore({
  reducer: {
    [coinloreApi.reducerPath]: coinloreApi.reducer,
    coinlore: coinloreReducer,
    portfolio: portfolioReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinloreApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
