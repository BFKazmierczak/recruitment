import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import postsReducer from './posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
