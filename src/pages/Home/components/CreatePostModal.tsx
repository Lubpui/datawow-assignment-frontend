import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { cookieConstants } from "../../../constants/localStorage.constants";
import { createPost } from "../../../store/slices/post.slice";
import { useAppDispatch } from "../../../store/store";
import type { CreatePostRequest } from "../../../types/post.type";
import LoadingProgressCircle from "../../../shared/LoadingProgressCircle";
import { COMMUNITIES } from "../../../constants/post.constants";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  callbackSubmit: () => void;
}

export interface LoginForm {
  community: string;
  title: string;
  description: string;
}

const defaultValues: LoginForm = {
  community: "History",
  title: "",
  description: "",
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  callbackSubmit,
}) => {
  const dispath = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const { handleSubmit, control, reset } = useForm<LoginForm>({
    defaultValues,
  });

  const onSubmit = async (value: LoginForm) => {
    try {
      setSubmitLoading(true);

      const token = Cookies.get(cookieConstants.TOKEN_KEY);
      if (token) {
        const decodedToken = jwtDecode(token) as { username: string };

        const postData: CreatePostRequest = {
          ...value,
          username: decodedToken.username,
        };

       await dispath(createPost(postData)).unwrap();

      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      handleClose();
      callbackSubmit();
    }
  };

  const handleClose = () => {
    onClose();
    reset(defaultValues);
  };

  const handleCloseMenu = (community: string) => {
    setAnchorEl(null);
    setSelectedCommunity(community);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Dialog
          open={open}
          onClose={handleClose}
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
          <DialogTitle>
            <Typography
              className="font-inter font-semibold"
              sx={{ fontSize: "28px" }}
            >
              Create Post
            </Typography>
          </DialogTitle>
          <DialogContent className="flex flex-col gap-4">
            <Box>
              <Controller
                name="community"
                control={control}
                render={({ field }) => {
                  return (
                    <>
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
                        onClick={handleClick}
                        className=""
                      >
                        <Typography className="normal-case text-[#4caf50]">
                          Choose a community
                        </Typography>
                        <KeyboardArrowDownIcon className="text-[#4caf50]" />
                      </Button>
                      <Menu
                        {...field}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        slotProps={{
                          list: {
                            "aria-labelledby": "basic-button",
                          },
                        }}
                        sx={{
                          "& .MuiPaper-root": {
                            borderRadius: "12px",
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                            border: "1px solid #e0e0e0",
                            minWidth: "200px",
                            marginTop: "4px",
                          },
                          "& .MuiList-root": {
                            padding: "8px 0",
                          },
                        }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        {COMMUNITIES.map((community, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={community}
                              selected={selectedCommunity === community}
                              onClick={() => handleCloseMenu(community)}
                              sx={{
                                minWidth: "200px",
                                height: "44px",
                                fontSize: "16px",
                                color: "#191919",
                                backgroundColor:
                                  selectedCommunity === community
                                    ? "#e8f5e8"
                                    : "transparent",
                                "&:hover": {
                                  backgroundColor:
                                    selectedCommunity === community
                                      ? "#e8f5e8"
                                      : "#f5f5f5",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "#e8f5e8",
                                  "&:hover": {
                                    backgroundColor: "#e8f5e8",
                                  },
                                },
                              }}
                            >
                              {community}
                              {selectedCommunity === community && (
                                <CheckRoundedIcon className="ml-auto text-[#4caf50]" />
                              )}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </>
                  );
                }}
              />
            </Box>

            <Controller
              name="title"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    placeholder="Title"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "transparent",
                        borderRadius: "8px",
                        height: "40px",
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
                );
              }}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    multiline
                    rows={10}
                    placeholder="What’s on your mind..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "transparent",
                        borderRadius: "8px",
                        height: "234px",
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
                );
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="success"
              className="h-[40px] w-[105px] normal-case"
              variant="outlined"
              sx={{
                boxShadow: "none",
                borderRadius: "8px",
                border: "1px solid #49A569",
                color: "#49A569",
              }}
              onClick={() => handleClose()}
            >
              <Typography className="text-[#3d8a57] text-[14px] font-semibold normal-case">
                Cancel
              </Typography>
            </Button>

            <Button
              color="success"
              type="submit"
              className="h-[40px] w-[105px] normal-case"
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
              onClick={() => {
                if (formRef.current) {
                  formRef.current.requestSubmit();
                }
              }}
            >
              <Typography className="text-white text-[14px] font-semibold normal-case">
                Post
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </form>

      <LoadingProgressCircle status={submitLoading} />
    </>
  );
};

export default CreatePostModal;
