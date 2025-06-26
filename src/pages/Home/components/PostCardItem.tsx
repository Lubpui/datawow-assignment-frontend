import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import type { PostData } from "../../../types/post.type";

interface PostCardItemProps {
  post: PostData;
  index: number;
  totalPosts: number;
  searchTerm: string;
}

const PostCardItem: React.FC<PostCardItemProps> = ({
  post,
  index,
  totalPosts,
  searchTerm,
}) => {
  const isFirst = index === 0;
  const isLast = index === totalPosts - 1;
  const isSingle = totalPosts === 1;

  const cornerRadiusClass = isSingle
    ? "rounded-[12px]"
    : isFirst
    ? "rounded-t-[12px]"
    : isLast
    ? "rounded-b-[12px]"
    : "";

  const borderClass = !isLast ? "border-b border-b-[#BBC2C0]" : "";

  const handleHighlightText = (text: string) => {
    if (!searchTerm || searchTerm.length < 2) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-yellow-200 text-yellow-800 font-semibold"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Box
      key={index}
      className={`flex flex-col gap-2 cursor-pointer min-[800px]:hover:bg-[#F0F0F0] bg-white p-5 w-full h-[200px] ${cornerRadiusClass} ${borderClass}`}
    >
      <Box className="flex items-center gap-3">
        <Avatar className="h-[31px] w-[31px]" src="/images/avatar-icon.svg" />
        <Typography className="font-inter font-medium text-[#939494]">
          {post.username}
        </Typography>
      </Box>

      <Box className="min-h-[24px] w-min bg-[#F3F3F3] rounded-full flex items-center px-3">
        <Typography
          className="font-inter text-[#4A4A4A]"
          sx={{ fontSize: "12px" }}
        >
          {post.community}
        </Typography>
      </Box>

      <Box className="h-[56px] flex flex-col">
        <Typography
          className="font-inter font-medium text-[#101828]"
          sx={{ fontSize: "16px" }}
        >
          {handleHighlightText(post.title)}
        </Typography>
        <Typography
          className="font-inter text-[#101828]"
          sx={{
            fontSize: "12px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.description}
        </Typography>
      </Box>

      <Box className="flex items-center gap-1">
        <img src="/images/comment-icon.svg" className="w-[16px] h-[16px]" />
        <Typography
          className="font-inter text-[#939494]"
          sx={{ fontSize: "12px" }}
        >
          {post.comments.length} Comments
        </Typography>
      </Box>
    </Box>
  );
};

export default PostCardItem;
