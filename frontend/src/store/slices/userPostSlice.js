import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyPosts, uploadUserPost, deleteUserPost } from "../../api/userPostApi";

// Get all posts from logged-in user
export const fetchMyPosts = createAsyncThunk(
  "userPosts/fetchMyPosts",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return await getMyPosts(token);
  }
);

// Upload post
export const uploadPost = createAsyncThunk(
  "userPosts/uploadPost",
  async (formData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    return await uploadUserPost(formData, token);
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  "userPosts/deletePost",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    await deleteUserPost(id, token);
    return id;
  }
);

const userPostSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      });
  },
});

export default userPostSlice.reducer;
