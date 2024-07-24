import { PostType } from '@/src/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  data: PostType[];
  previousLength: number;
}

const initialState: PostsState = {
  data: [],
  previousLength: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<PostType[]>) => {
      state.previousLength = state.data.length;
      state.data = [...action.payload, ...state.data];
    },
    removePost: (state, action: PayloadAction<PostType>) => {
      state.previousLength = state.data.length;
      state.data = state.data.filter((post) => post.id !== action.payload.id);
    },
  },
});

export const { addPosts, removePost } = postsSlice.actions;
export default postsSlice.reducer;
