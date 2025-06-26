import {
  Backdrop,
  CircularProgress,
  type CircularProgressProps,
} from "@mui/material";
import React from "react";

interface LoadingProgressCircleProps extends CircularProgressProps {
  status: boolean;
  important?: boolean;
}

const LoadingProgressCircle: React.FC<LoadingProgressCircleProps> = ({
  status,
  important,
}) => {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => (important ? 99999 : theme.zIndex.modal + 1) }}
      open={status}
      timeout={{ exit: 1000 }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingProgressCircle;
