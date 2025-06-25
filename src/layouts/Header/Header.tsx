import { AppBar, Box } from "@mui/material";
import React from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <AppBar position="fixed">
      <Box></Box>
    </AppBar>
  );
};

export default Header;
