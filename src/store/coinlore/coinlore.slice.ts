import storage from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CoinloreState {
  coinId: string;
  exchangeId: string;
  watchlist: string[];
}

const LS_KEY = 'cl_watchlist';
const initialState: CoinloreState = {
  coinId: '',
  exchangeId: '',
  watchlist: storage.get(LS_KEY) || [],
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
    addToWachlist(state, action: PayloadAction<string>) {
      state.watchlist.push(action.payload);
      storage.set(LS_KEY, state.watchlist);
    },
    removeFromWachlist(state, action: PayloadAction<string>) {
      state.watchlist = state.watchlist.filter((id) => id !== action.payload);
      storage.set(LS_KEY, state.watchlist);
    },
  },
  selectors: {
    selectCoinId: (sliceState) => sliceState.coinId,
    selectExchangeId: (sliceState) => sliceState.exchangeId,
    selectWatchlist: (sliceState) => sliceState.watchlist,
  },
});

export const coinloreReducer = coinloreSlice.reducer;
export const setCoinIdAction = coinloreSlice.actions.setCoinId;
export const setExchangeIdAction = coinloreSlice.actions.setExchangeId;
export const addToWachlistAction = coinloreSlice.actions.addToWachlist;
export const removeFromWachlistAction =
  coinloreSlice.actions.removeFromWachlist;
export const { selectCoinId, selectExchangeId, selectWatchlist } =
  coinloreSlice.selectors;
