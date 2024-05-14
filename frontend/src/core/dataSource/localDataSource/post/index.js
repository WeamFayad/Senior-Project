import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const postSliceName = "Post";

export const postSlice = createSlice({
  name: postSliceName,
  initialState,
  reducers: {
    loadPosts: (state, { payload }) => {
      return {
        ...state,
        posts: payload,
      };
    },
    selectPost: (state, { payload }) => {
      return {
        ...state,
        curerntSelected: payload,
      };
    },
    resultPosts: (state, { payload }) => {
      return {
        ...state,
        resultPosts: payload,
      };
    },
    cleanData: (state, action) => {
      return { ...initialState };
    },
  },
});

export const { loadPosts, cleanData, selectPost, resultPosts } =
  postSlice.actions;

export default postSlice.reducer;