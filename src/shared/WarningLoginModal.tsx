import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../utils/route.util";

interface WarningLoginModalProps {
  open: boolean;
  onClose: () => void;
}

const WarningLoginModal: React.FC<WarningLoginModalProps> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();

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
        <DialogTitle className="!px-6 min-[800px]:!px-8 !pt-8 flex items-center justify-center">
          <WarningRoundedIcon className="text-[#F23536] !h-[70px] !w-[70px]" />
        </DialogTitle>
        <DialogContent className="flex flex-col gap-4 !px-6 min-[800px]:!px-8">
          <Typography
            className="font-inter text-[#5B5B5B] text-center"
            sx={{ fontSize: "18px" }}
          >
            Please <span style={{ fontWeight: 600 }}>Sign in</span> to use this
            feature
          </Typography>
        </DialogContent>
        <DialogActions className="!px-6 min-[800px]:!px-8 !pb-8">
          <Box className="flex flex-col min-[800px]:flex-row gap-2 w-full">
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
              onClick={() => {
                onClose();
                navigate(`/${RoutePath.LOGIN}`);
              }}
            >
              <Typography className="text-white text-[14px] font-semibold normal-case">
                Sign in
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WarningLoginModal;
