import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import bookmarksReducer from './bookmarks/bookmarksSlice';
import postsReducer from './posts/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
