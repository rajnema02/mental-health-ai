import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyPostHistory, analyzePost } from '../../api/userPostApi';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// ✅ Fetch user's own posts
export const fetchMyPosts = createAsyncThunk(
  'userPosts/fetchMyPosts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      return await getMyPostHistory(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Create and analyze new post
export const createNewPost = createAsyncThunk(
  'userPosts/createNewPost',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      if (!token) throw new Error('Missing authentication token');
      return await analyzePost(postData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const userPostSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchMyPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload || [];
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create new post
      .addCase(createNewPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) state.posts.unshift(action.payload);
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userPostSlice.reducer;
