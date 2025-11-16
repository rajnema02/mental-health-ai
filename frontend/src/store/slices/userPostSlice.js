import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyPostHistory, analyzePost } from '../../api/userPostApi';

// -----------------------------------------------
// Initial State
// -----------------------------------------------
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// -----------------------------------------------
// Async Thunks
// -----------------------------------------------

// Fetch user's post history
export const fetchMyPosts = createAsyncThunk(
  'userPosts/fetchMyPosts',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await getMyPostHistory(token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

// Create + analyze a new post
export const createNewPost = createAsyncThunk(
  'userPosts/createNewPost',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const data = await analyzePost(postData, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || error.message
      );
    }
  }
);

// -----------------------------------------------
// Slice
// -----------------------------------------------
const userPostSlice = createSlice({
  name: 'userPosts',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch post history
      .addCase(fetchMyPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
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
        state.posts.unshift(action.payload); // Add new post at top
      })
      .addCase(createNewPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userPostSlice.reducer;
