import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  isSiderCollapsed: boolean;
}

const initialState: LayoutState = {
  isSiderCollapsed: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsSiderCollapsed(state, action: PayloadAction<boolean>) {
      state.isSiderCollapsed = action.payload;
    },
  },
  selectors: {
    selectIsSiderCollapsed: (sliceState) => sliceState.isSiderCollapsed,
  },
});

export const layoutReducer = layoutSlice.reducer;
export const setIsSiderCollapsedAction = layoutSlice.actions.setIsSiderCollapsed;
export const { selectIsSiderCollapsed } = layoutSlice.selectors;
