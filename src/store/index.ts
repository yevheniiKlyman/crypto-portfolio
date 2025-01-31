import { configureStore } from '@reduxjs/toolkit';
import { coinloreApi } from './coinlore/coinlore.api';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [coinloreApi.reducerPath]: coinloreApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinloreApi.middleware),
});
