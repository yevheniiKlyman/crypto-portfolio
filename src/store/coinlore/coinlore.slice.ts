import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CoinloreState {
  coinId: string
}

const initialState: CoinloreState = { coinId: '' };

const coinloreSlice = createSlice({
  name: 'coinlore',
  initialState,
  reducers: {
    setCoinId(state, action: PayloadAction<string>) {
      state.coinId = action.payload;
    },
  },
  selectors: {
    selectCoinId: (sliceState) => sliceState.coinId,
  },
});

export const coinloreReducer = coinloreSlice.reducer;
export const setCoinIdAction = coinloreSlice.actions.setCoinId;
export const { selectCoinId } = coinloreSlice.selectors;
