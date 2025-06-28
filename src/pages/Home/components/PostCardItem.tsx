import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import type { PostData } from "../../../types/post.type";
import DeletePostModal from "./DeletePostModal";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../utils/route.util";

interface PostCardItemProps {
  post: PostData;
  index: number;
  totalPosts: number;
  searchTerm: string;
  isOurBlog: boolean;
  onClickEdit: (post: PostData) => void;
  callbackPost: () => void;
}

const PostCardItem: React.FC<PostCardItemProps> = ({
  post,
  index,
  totalPosts,
  searchTerm,
  isOurBlog,
  onClickEdit,
  callbackPost,
}) => {
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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
    <>
      <Box
        key={index}
        className={`flex flex-col gap-2 cursor-pointer min-[800px]:hover:bg-[#f9f9f9] bg-white p-5 w-full h-[200px] ${cornerRadiusClass} ${borderClass}`}
        onClick={() => {
          navigate(
            `/core/${RoutePath.POST_DETAILS.replace(":postId", post._id)}`
          );
        }}
      >
        <Box className="flex items-start justify-between">
          <Box className="flex items-center gap-3">
            <Avatar
              className="h-[31px] w-[31px]"
              src="/images/avatar-icon.svg"
            />
            <Typography className="font-inter font-medium text-[#939494]">
              {post.username}
            </Typography>
          </Box>

          {isOurBlog && (
            <Box className="flex">
              <IconButton onClick={(e) => {
                e.stopPropagation();
                onClickEdit(post)
              }}>
                <img
                  className=""
                  width={16}
                  src={"/images/edit-2-icon.svg"}
                  alt="home-icon"
                />
              </IconButton>
              <IconButton onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(true)
              }}>
                <img
                  className=""
                  width={16}
                  src={"/images/delete-icon.svg"}
                  alt="home-icon"
                />
              </IconButton>
            </Box>
          )}
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

      <DeletePostModal
        open={openDeleteModal}
        postId={post._id}
        onClose={() => setOpenDeleteModal(false)}
        callbackDelete={() => callbackPost()}
      />
    </>
  );
};

export default PostCardItem;
