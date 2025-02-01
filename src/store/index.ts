import { configureStore } from '@reduxjs/toolkit';
import { coinloreApi } from './coinlore/coinlore.api';
import { coinloreReducer } from './coinlore/coinlore.slice';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const store = configureStore({
  reducer: {
    [coinloreApi.reducerPath]: coinloreApi.reducer,
    coinlore: coinloreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinloreApi.middleware),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppState = any;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
