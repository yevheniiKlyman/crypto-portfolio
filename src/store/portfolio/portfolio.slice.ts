import storage from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState } from './portfolioDataTypes';
import { addTransaction, LS_PORTFOLIO_KEY } from './portfolioUtils';

const initialState: PortfolioState = {
  isDrawerOpen: false,
  showSuccessTransaction: false,
  selectedAsset: null,
  assets: storage.get(LS_PORTFOLIO_KEY) || {
    totalPrice: 0,
    assets: [],
  },
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    setIsDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload;
    },
    setShowSuccessTransaction(state, action: PayloadAction<boolean>) {
      state.showSuccessTransaction = action.payload;
    },
    setSelectedAsset(state, action: PayloadAction<{ value: string; label: string } | null>) {
      state.selectedAsset = action.payload;
    },
    addTransaction,
  },
  selectors: {
    selectIsDrawerOpen: (sliceState) => sliceState.isDrawerOpen,
    selectShowSuccessTransaction: (sliceState) =>
      sliceState.showSuccessTransaction,
    selectAssets: (sliceState) => sliceState.assets,
    selectSelectedAsset: (sliceState) => sliceState.selectedAsset,
  },
});

export const portfolioReducer = portfolioSlice.reducer;
export const setIsDrawerOpenAction = portfolioSlice.actions.setIsDrawerOpen;
export const setShowSuccessTransactionAction =
  portfolioSlice.actions.setShowSuccessTransaction;
export const addTransactionAction = portfolioSlice.actions.addTransaction;
export const setSelectedAssetAction = portfolioSlice.actions.setSelectedAsset;
export const {
  selectIsDrawerOpen,
  selectShowSuccessTransaction,
  selectAssets,
  selectSelectedAsset,
} = portfolioSlice.selectors;
