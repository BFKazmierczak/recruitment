import { BookmarkType } from '@/src/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarksState {
  data: BookmarkType[];
}

const initialState: BookmarksState = {
  data: [],
};

const bookmarksSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<BookmarkType>) => {
      state.data = [action.payload, ...state.data];
    },
    removeBookmark: (state, action: PayloadAction<BookmarkType>) => {
      state.data = state.data.filter((bookmark) => bookmark.id !== action.payload.id);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
