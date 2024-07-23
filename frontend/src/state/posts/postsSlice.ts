import { PostType } from '@/src/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
  data: PostType[];
}

const initialState: PostsState = {
  data: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<PostType[]>) => {
      state.data.push(...action.payload);
    },
  },
});

export const { addPosts } = postsSlice.actions;
export default postsSlice.reducer;
