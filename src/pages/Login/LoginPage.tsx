import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { login } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { RoutePath } from "../../utils/route.util";
import LoadingProgressCircle from "../../shared/LoadingProgressCircle";
import { useState } from "react";

export interface LoginForm {
  username: string;
}

const defaultValues: LoginForm = {
  username: "",
};

const LoginPage = () => {
  const dispath = useAppDispatch();
  const navigate = useNavigate();

  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  const { handleSubmit, control } = useForm<LoginForm>({
    defaultValues,
  });

  const onSubmit = async (value: LoginForm) => {
    try {
      setLoginLoading(true);
      await dispath(login(value.username)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoginLoading(false);
      navigate(`/core/${RoutePath.HOME}`);
    }
  };

  return (
    <>
      <Box className="bg-[#243831] flex flex-col h-full min-[800px]:flex-row-reverse relative">
        <Box className="absolute top-6 left-6">
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

        <Box className="flex flex-col gap-9 justify-center items-center bg-[#2B5F44] w-full min-h-[362px] min-[800px]:h-auto min-[800px]:w-[45%] rounded-b-[36px] min-[800px]:rounded-br-none min-[800px]:rounded-l-[36px]">
          <img
            src="/images/logo.png"
            alt="logo"
            className="h-[130px] min-[800px]:h-[230px] w-auto"
          />
          <Typography
            sx={{ fontSize: mobileMatches ? "24px" : "28px" }}
            className="text-white italic font-castoro"
          >
            a Board
          </Typography>
        </Box>

        <Box className="min-[800px]:flex-1 h-full flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="flex flex-col w-full px-4 min-[800px]:w-auto gap-6 justify-center items-start">
              <Typography
                className="text-white font-semibold pb-4"
                sx={{ fontSize: "28px" }}
              >
                Sign in
              </Typography>

              <Controller
                name="username"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      className="w-full min-[800px]:w-[384px] h-[44px]"
                      variant="outlined"
                      placeholder="Username"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "white",
                          borderRadius: "8px",
                          height: "44px",
                          "& fieldset": {
                            border: "none",
                          },
                          "&:hover fieldset": {
                            border: "none",
                          },
                          "&.Mui-focused fieldset": {
                            border: "none",
                          },
                        },
                      }}
                    />
                  );
                }}
              />

              <Button
                color="success"
                className="w-full min-[800px]:w-[384px] h-[44px] normal-case"
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#49A569",
                  boxShadow: "none",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#3d8a57",
                    boxShadow: "none",
                  },
                }}
              >
                <Typography className="text-white text-[14px] font-semibold normal-case">
                  Sign in
                </Typography>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <LoadingProgressCircle status={loginLoading} />
    </>
  );
};

export default LoginPage;
