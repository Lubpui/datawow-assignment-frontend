import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useAppDispatch } from "../../../store/store";
import { deletePost } from "../../../store/slices/post.slice";
import LoadingProgressCircle from "../../../shared/LoadingProgressCircle";

interface DeletePostModalProps {
  open: boolean;
  postId: string;
  onClose: () => void;
  callbackDelete: () => void;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  open,
  postId,
  onClose,
  callbackDelete,
}) => {
  const dispath = useAppDispatch();

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    try {
      setSubmitLoading(true);
      if (!postId) return;

      await dispath(deletePost(postId)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitLoading(false);
      onClose();
      callbackDelete();
    }
  }, [dispath, postId, onClose, callbackDelete]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              margin: "16px !important",
              width: "400px",
            },
          },
        }}
      >
        <DialogTitle className="!px-6 min-[800px]:!px-8 !pt-8">
          <Typography
            className="font-inter text-center"
            sx={{ fontSize: "20px", fontWeight: 600 }}
          >
            Please confirm if you wish to delete the post
          </Typography>
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 !px-6 min-[800px]:!px-8">
          <Typography
            className="font-inter text-[#5B5B5B] text-center"
            sx={{ fontSize: "14px" }}
          >
            Are you sure you want to delete the post? Once deleted, it cannot be
            recovered.
          </Typography>
        </DialogContent>
        <DialogActions className="!px-6 min-[800px]:!px-8 !pb-8">
          <Box className="flex flex-col min-[800px]:flex-row gap-2 w-full">
            <Button
              color="success"
              className="h-[40px] w-full normal-case"
              variant="outlined"
              sx={{
                boxShadow: "none",
                borderRadius: "8px",
                border: "1px solid #DADADA",
                color: "#5B5B5B",
              }}
              onClick={() => onClose()}
            >
              <Typography className="text-[#5B5B5B] text-[14px] font-semibold normal-case">
                Cancel
              </Typography>
            </Button>

            <Button
              color="success"
              type="submit"
              className="h-[40px] w-full normal-case"
              variant="contained"
              sx={{
                backgroundColor: "#F23536",
                boxShadow: "none",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#F23536",
                  boxShadow: "none",
                },
              }}
              onClick={() => handleDelete()}
            >
              <Typography className="text-white text-[14px] font-semibold normal-case">
                Delete
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

      <LoadingProgressCircle status={submitLoading} />
    </>
  );
};

export default DeletePostModal;
