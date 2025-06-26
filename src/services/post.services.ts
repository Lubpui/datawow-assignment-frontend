import axios from "axios";
import type { CreatePostRequest, DynamicPostQuery } from "../types/post.type";

export const createPost = async (createPostRequest: CreatePostRequest): Promise<any> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_SERVER_URL}/posts`,
    createPostRequest
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
