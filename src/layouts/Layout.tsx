import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

interface LayoutProps {
  isAuthented: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isAuthented }) => {
  return (
    <Box className="flex h-[100vh] m-0">
      {isAuthented && <Header />}

      <Box className="h-full w-[100vw]">
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Layout;
