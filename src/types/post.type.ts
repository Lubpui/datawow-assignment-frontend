export interface CreatePostRequest {
  username: string;
  community: string;
  title: string;
  description: string;
}

export interface UpdatePostRequest extends Omit<PostData, "createdAt"> {}

export interface DynamicPostQuery {
  username?: string;
  mode: "all" | "user";
  community?: string;
  term?: string;
}

export interface PostData {
  _id: string;
  username: string;
  community: string;
  title: string;
  description: string;
  createdAt: string;
  comments: CommentData[];
}

export interface CommentData {
  username: string;
  description: string;
  createdAt: string;
}
