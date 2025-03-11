import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PortfolioState } from './portfolioTypes';

const initialState: PortfolioState = {
  isDrawerOpen: false,
  showSuccessTransaction: false,
  selectedAsset: null,
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
    setSelectedAsset(
      state,
      action: PayloadAction<{ value: string; label: string } | null>
    ) {
      state.selectedAsset = action.payload;
    },
  },
  selectors: {
    selectIsDrawerOpen: (sliceState) => sliceState.isDrawerOpen,
    selectShowSuccessTransaction: (sliceState) =>
      sliceState.showSuccessTransaction,
    selectSelectedAsset: (sliceState) => sliceState.selectedAsset,
  },
});

export const portfolioReducer = portfolioSlice.reducer;
export const setIsDrawerOpenAction = portfolioSlice.actions.setIsDrawerOpen;
export const setShowSuccessTransactionAction =
  portfolioSlice.actions.setShowSuccessTransaction;
export const setSelectedAssetAction = portfolioSlice.actions.setSelectedAsset;
export const {
  selectIsDrawerOpen,
  selectShowSuccessTransaction,
  selectSelectedAsset,
} = portfolioSlice.selectors;
