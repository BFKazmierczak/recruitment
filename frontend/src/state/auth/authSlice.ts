import { UserType } from '@/src/shared/types';
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
    login: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
