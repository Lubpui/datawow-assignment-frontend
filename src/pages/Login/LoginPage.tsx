import { Box, Button, TextField, Typography, useMediaQuery, type Theme } from "@mui/material";

const LoginPage = () => {
  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  return (
    <Box className="bg-[#243831] flex flex-col h-full min-[800px]:flex-row-reverse">
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
        <Box className="flex flex-col w-full px-4 min-[800px]:w-auto gap-6 justify-center items-start">
          <Typography
            className="text-white font-semibold pb-4"
            sx={{ fontSize: "28px" }}
          >
            Sign in
          </Typography>
          <TextField
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
          <Button
            color="success"
            className="w-full min-[800px]:w-[384px] h-[44px] normal-case"
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
          >
            <Typography className="text-white text-[14px] font-semibold normal-case">
              Sign in
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
