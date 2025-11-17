// src/store/slices/userPostSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMyPosts, uploadUserPost, deleteUserPost } from "../../api/userPostApi";

// Fetch all posts of logged-in user
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
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchMyPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // UPLOAD
      .addCase(uploadPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload); // NEW POST AT TOP
      })
      .addCase(uploadPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p._id !== action.payload);
      });
  },
});

export default userPostSlice.reducer;
