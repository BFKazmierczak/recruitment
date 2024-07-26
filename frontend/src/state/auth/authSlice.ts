import { UserType, UserWithToken } from '@/src/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user?: UserType;
};

const initialState: AuthState = {
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserWithToken>) => {
      state.user = { ...action.payload.user, accessToken: action.payload.accessToken };
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
