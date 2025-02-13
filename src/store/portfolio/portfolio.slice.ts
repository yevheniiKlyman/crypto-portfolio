import storage from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState } from './portfolioDataTypes';
import { addTransaction, LS_PORTFOLIO_KEY } from './portfolioUtils';

const initialState: PortfolioState = {
  isDrawerOpen: false,
  assets: storage.get(LS_PORTFOLIO_KEY) || [],
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setIsDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload;
    },
    addTransaction,
  },
  selectors: {
    selectIsDrawerOpen: (sliceState) => sliceState.isDrawerOpen,
  },
});

export const portfolioReducer = portfolioSlice.reducer;
export const setIsDrawerOpenAction = portfolioSlice.actions.setIsDrawerOpen;
export const addTransactionAction = portfolioSlice.actions.addTransaction;
export const { selectIsDrawerOpen } = portfolioSlice.selectors;
