import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './authTypes';

interface AuthState {
  user: User | null;
  isUserLoading: boolean;
  isAuthModalOpen: boolean;
  isSignOutModalOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  isUserLoading: true,
  isAuthModalOpen: false,
  isSignOutModalOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
    setIsAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    setIsSignOutModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSignOutModalOpen = action.payload;
    },
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
    selectIsUserLoading: (sliceState) => sliceState.isUserLoading,
    selectIsAuthModalOpen: (sliceState) => sliceState.isAuthModalOpen,
    selectIsSignOutModalOpen: (sliceState) => sliceState.isSignOutModalOpen,
  },
});

export const authReducer = authSlice.reducer;
export const setUserAction = authSlice.actions.setUser;
export const setIsUserLoadingAction = authSlice.actions.setIsUserLoading;
export const setIsAuthModalOpenAction = authSlice.actions.setIsAuthModalOpen;
export const setIsSignOutModalOpenAction =
  authSlice.actions.setIsSignOutModalOpen;
export const {
  selectUser,
  selectIsAuthModalOpen,
  selectIsSignOutModalOpen,
  selectIsUserLoading,
} = authSlice.selectors;
