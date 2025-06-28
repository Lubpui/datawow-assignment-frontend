import { Box, CssBaseline, useMediaQuery, type Theme } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import { RoutePath } from "../utils/route.util";

interface LayoutProps {
  isAuthented?: boolean;
}

const Layout: React.FC<LayoutProps> = () => {
  const location = useLocation();
  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );
  const isLoginPage = location.pathname.includes(RoutePath.LOGIN);

  return (
    <Box className="flex h-[100vh] m-0">
      <CssBaseline />
      {!isLoginPage && <Header />}
      {!isLoginPage && !mobileMatches && <Menu />}

      <Box className={`h-full w-[100vw] ${!isLoginPage &&'pt-[64px]'}`}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
