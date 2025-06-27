import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as postServices from "../../services/post.services";
import type {
  CreatePostRequest,
  DynamicPostQuery,
  PostData,
  UpdatePostRequest,
} from "../../types/post.type";

export interface PostState {}

const initialState: PostState = {};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const createPost = createAsyncThunk(
  "post",
  async (createPostRequest: CreatePostRequest): Promise<PostData> => {
    const response = await postServices.createPost(createPostRequest);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "post/update",
  async (updatePostRequest: UpdatePostRequest): Promise<PostData> => {
    const response = await postServices.updatePost(updatePostRequest);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "post/delete",
  async (postId: string): Promise<PostData> => {
    const response = await postServices.deletePost(postId);
    return response.data;
  }
);

export const getDynamicPosts = createAsyncThunk(
  "post/dynamic",
  async (dynamicPostQuery: DynamicPostQuery): Promise<any> => {
    const response = await postServices.getDynamicPosts(dynamicPostQuery);
    return response;
  }
);

export default PostSlice.reducer;
