import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
  }
});

export const userReducer = userSlice.reducer;
export const setUserAction = userSlice.actions.setUser;
export const { selectUser } = userSlice.selectors;
