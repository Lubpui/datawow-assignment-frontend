import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { getPostById, updateComment } from "../../../store/slices/post.slice";
import type { PostData } from "../../../types/post.type";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { cookieConstants } from "../../../constants/localStorage.constants";
import dayjs from "dayjs";
import { getFormatTimeAgo } from "../../../utils/post.util";
import WarningLoginModal from "../../../shared/WarningLoginModal";

const PostDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState<PostData>();
  const [isAddComments, setIsAddComments] = useState<boolean>(false);
  const [openAddComments, setOpenIsAddComments] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const [openWarningLoginModal, setOpenWarningLoginModal] =
    useState<boolean>(false);

  const token = Cookies.get(cookieConstants.TOKEN_KEY);

  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  const fetchPost = useCallback(async () => {
    try {
      if (!postId) return;

      const postRes = await dispatch(getPostById(postId)).unwrap();

      setPost(postRes);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleAddComments = useCallback(async () => {
    try {
      if (mobileMatches) {
        setOpenIsAddComments(false);
      } else {
        setIsAddComments(false);
      }

      if (!post) return;

      if (!token) return;

      const decodedToken = jwtDecode(token) as { username: string };

      const payload: any = {
        postId: post._id,
        data: {
          username: decodedToken.username,
          description: comment,
        },
      };

      await dispatch(updateComment(payload)).unwrap();

      setComment("");
    } catch (error) {
      console.log(error);
    }
  }, [comment, dispatch, mobileMatches, post, token]);

  const renderContent = useMemo(() => {
    if (!post) return <CircularProgress />;

    return (
      <Box className={`flex flex-col gap-3 bg-white w-full`}>
        <Box className="flex items-start justify-between">
          <Box className="flex items-center gap-3">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#4CAF50",
                    border: "2px solid white",
                  }}
                />
              }
            >
              <Avatar
                className="h-[31px] w-[31px]"
                src="/images/avatar-icon.svg"
              />
            </Badge>

            <Typography
              className="font-inter text-[#191919]"
              sx={{ fontSize: "14px", fontWeight: 500 }}
            >
              {post.username}
            </Typography>

            <Typography
              className="font-inter text-[#939494]"
              sx={{ fontSize: "12px", fontWeight: 400 }}
            >
              {getFormatTimeAgo(dayjs(post.createdAt))}
            </Typography>
          </Box>
        </Box>

        <Box className="min-h-[24px] w-min bg-[#F3F3F3] rounded-full flex items-center px-3">
          <Typography
            className="font-inter text-[#4A4A4A]"
            sx={{ fontSize: "12px" }}
          >
            {post.community}
          </Typography>
        </Box>

        <Box className="flex flex-col">
          <Typography
            className="font-inter text-[#101828]"
            sx={{ fontSize: "28px", fontWeight: 600 }}
          >
            {post.title}
          </Typography>
          <Typography
            className="font-inter text-[#101828]"
            sx={{
              fontSize: "12px",
            }}
          >
            {post.description}
          </Typography>
        </Box>

        <Box className="flex items-center gap-1 mt-3">
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
  }, [post]);

  const renderAddComments = useMemo(() => {
    return isAddComments ? (
      <Box className="w-full flex flex-col gap-2">
        <TextField
          multiline
          rows={5}
          placeholder="What’s on your mind..."
          onChange={(e) => {
            setComment(e.target.value);
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "transparent",
              borderRadius: "8px",
              "& fieldset": {
                borderColor: "#D8E9E4",
              },
              "&:hover fieldset": {
                borderColor: "#D8E9E4",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D8E9E4",
              },
            },
          }}
        />

        <Box className="flex gap-2 ml-auto">
          <Button
            color="success"
            className="h-[40px] w-full min-[800px]:w-[105px] normal-case"
            variant="outlined"
            sx={{
              boxShadow: "none",
              borderRadius: "8px",
              border: "1px solid #49A569",
              color: "#49A569",
            }}
            onClick={() => {
              if (mobileMatches) {
                setOpenIsAddComments(false);
              } else {
                setIsAddComments(false);
              }
            }}
          >
            <Typography className="text-[#3d8a57] text-[14px] font-semibold normal-case">
              Cancel
            </Typography>
          </Button>

          <Button
            color="success"
            type="submit"
            className="h-[40px] w-full min-[800px]:w-[105px] normal-case"
            variant="contained"
            sx={{
              backgroundColor: "#49A569",
              boxShadow: "none",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#3d8a57",
                boxShadow: "none",
              },
            }}
            onClick={async () => {
              await handleAddComments();
              fetchPost();
            }}
          >
            <Typography className="text-white text-[14px] font-semibold normal-case">
              Post
            </Typography>
          </Button>
        </Box>
      </Box>
    ) : (
      <Box>
        <Button
          color="success"
          sx={{
            border: "1px solid #4caf50",
            boxShadow: "none",
            borderRadius: "8px",
            height: "40px",
            paddingX: "16px",
            "&:hover": {
              boxShadow: "none",
            },
          }}
          onClick={() => {
            if (!token) {
              setOpenWarningLoginModal(true);
              return;
            }

            if (mobileMatches) {
              setOpenIsAddComments(true);
            } else {
              setIsAddComments(true);
            }
          }}
          className="w-auto"
        >
          <Typography className="normal-case text-[#4caf50]">
            Add Comments
          </Typography>
        </Button>
      </Box>
    );
  }, [fetchPost, handleAddComments, isAddComments, mobileMatches, token]);

  const renderComments = useMemo(() => {
    if (!post) return;

    return post.comments.map((comment) => {
      return (
        <Box>
          <Box className="flex items-center gap-3">
            <Avatar
              className="h-[40px] w-[40px]"
              src="/images/avatar-temp-icon.svg"
            />
            <Typography
              className="font-inter text-[#191919]"
              sx={{ fontSize: "14px", fontWeight: 500 }}
            >
              {post.username}
            </Typography>
            <Typography
              className="font-inter text-[#939494]"
              sx={{ fontSize: "12px", fontWeight: 400 }}
            >
              {getFormatTimeAgo(dayjs(comment.createdAt))}
            </Typography>
          </Box>

          <Typography
            className="font-inter text-[#101828]"
            sx={{
              fontSize: "12px",
              paddingLeft: "52px",
            }}
          >
            {comment.description}
          </Typography>
        </Box>
      );
    });
  }, [post]);

  const renderAddCommentModal = useMemo(() => {
    return (
      <Dialog
        open={openAddComments}
        onClose={() => {
          setOpenIsAddComments(false);
          setComment("");
        }}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              margin: "16px !important",
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle className="!px-4">
          <Typography
            className="font-inter font-semibold"
            sx={{ fontSize: "20px" }}
          >
            Add Comments
          </Typography>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 !px-4">
          <TextField
            multiline
            rows={5}
            placeholder="What’s on your mind..."
            onChange={(e) => {
              setComment(e.target.value);
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#D8E9E4",
                },
                "&:hover fieldset": {
                  borderColor: "#D8E9E4",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#D8E9E4",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions className="!px-4 !pb-6">
          <Box className="flex flex-col w-full gap-2 ml-auto">
            <Button
              color="success"
              className="h-[40px] w-full min-[800px]:w-[105px] normal-case"
              variant="outlined"
              sx={{
                boxShadow: "none",
                borderRadius: "8px",
                border: "1px solid #49A569",
                color: "#49A569",
              }}
              onClick={() => {
                if (mobileMatches) {
                  setOpenIsAddComments(false);
                } else {
                  setIsAddComments(false);
                }
              }}
            >
              <Typography className="text-[#3d8a57] text-[14px] font-semibold normal-case">
                Cancel
              </Typography>
            </Button>

            <Button
              color="success"
              type="submit"
              className="h-[40px] w-full min-[800px]:w-[105px] normal-case"
              variant="contained"
              sx={{
                backgroundColor: "#49A569",
                boxShadow: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#3d8a57",
                  boxShadow: "none",
                },
              }}
              onClick={async () => {
                await handleAddComments();
                fetchPost();
              }}
            >
              <Typography className="text-white text-[14px] font-semibold normal-case">
                Post
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    );
  }, [fetchPost, handleAddComments, mobileMatches, openAddComments]);

  return (
    <>
      <Box className="flex justify-center">
        <Box className="flex flex-col gap-6 max-w-[800px] w-full py-8 mx-5">
          {/* #D8E9E4 */}
          <Box>
            <IconButton
              sx={{
                backgroundColor: "#D8E9E4",
                "&:hover": {
                  backgroundColor: "#c5ddd6",
                },
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
          </Box>

          {renderContent}

          {renderAddComments}

          {renderComments}
        </Box>
      </Box>

      <WarningLoginModal
        open={openWarningLoginModal}
        onClose={() => setOpenWarningLoginModal(false)}
      />

      {renderAddCommentModal}
    </>
  );
};

export default PostDetails;
