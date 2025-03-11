import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CoinloreState {
  coinId: string;
  exchangeId: string;
}

const initialState: CoinloreState = {
  coinId: '',
  exchangeId: '',
};

const coinloreSlice = createSlice({
  name: 'coinlore',
  initialState,
  reducers: {
    setCoinId(state, action: PayloadAction<string>) {
      state.coinId = action.payload;
    },
    setExchangeId(state, action: PayloadAction<string>) {
      state.exchangeId = action.payload;
    },
  },
  selectors: {
    selectCoinId: (sliceState) => sliceState.coinId,
    selectExchangeId: (sliceState) => sliceState.exchangeId,
  },
});

export const coinloreReducer = coinloreSlice.reducer;
export const setCoinIdAction = coinloreSlice.actions.setCoinId;
export const setExchangeIdAction = coinloreSlice.actions.setExchangeId;
export const { selectCoinId, selectExchangeId } = coinloreSlice.selectors;
