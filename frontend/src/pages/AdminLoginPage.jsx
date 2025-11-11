import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyPostHistory, analyzePost } from '../api/userPostApi';

const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchMyPosts = createAsyncThunk('userPosts/fetchMyPosts', async () => {
  const data = await getMyPostHistory();
  return data;
});

export const createNewPost = createAsyncThunk(
  'userPosts/createNewPost',
  async ({ caption, imageUrl }, thunkAPI) => {
    try {
      const data = await analyzePost(caption, imageUrl);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userPostSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch History
      .addCase(fetchMyPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create New Post
      .addCase(createNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add new post to the top of the list
        state.posts.unshift(action.payload);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userPostSlice.reducer;