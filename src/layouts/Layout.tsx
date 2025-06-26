import { Box, CssBaseline, useMediaQuery, type Theme } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";

interface LayoutProps {
  isAuthented: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAuthented }) => {
  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  return (
    <Box className="flex h-[100vh] m-0">
      <CssBaseline />
      {isAuthented && <Header />}
      {isAuthented &&!mobileMatches&& <Menu />}

      <Box className="h-full w-[100vw] pt-[64px]">
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
