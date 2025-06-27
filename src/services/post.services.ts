import axios from "axios";
import type {
  CreatePostRequest,
  DynamicPostQuery,
  UpdatePostRequest,
} from "../types/post.type";

export const createPost = async (
  createPostRequest: CreatePostRequest
): Promise<any> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts`,
    createPostRequest
  );

  return response;
};

export const updatePost = async (
  updatePostRequest: UpdatePostRequest
): Promise<any> => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts/update/${
      updatePostRequest._id
    }`,
    updatePostRequest
  );

  return response;
};

export const updateComment = async (
  updateCommentRequest: any
): Promise<any> => {
  const response = await axios.put(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts/update/comment/${
      updateCommentRequest.postId
    }`,
    updateCommentRequest.data
  );

  return response;
};

export const deletePost = async (postId: string): Promise<any> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts/delete/${postId}`
  );

  return response;
};

export const getDynamicPosts = async (
  dynamicPostQuery: DynamicPostQuery
): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts/dynamic`,
    { params: dynamicPostQuery }
  );

  return response;
};

export const getPostById = async (postId: string): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts/${postId}`
  );

  return response;
};
