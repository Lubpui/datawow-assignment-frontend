import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { RoutePath } from "../../utils/route.util";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Cookies from "js-cookie";
import { cookieConstants } from "../../constants/localStorage.constants";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = Cookies.get(cookieConstants.TOKEN_KEY);

  const getFocusMemu = useMemo(
    () => (path: string) => {
      return location.pathname.includes(path);
    },
    [location]
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          border: "none",
          backgroundColor: "#BBC2C0",
          width: 280,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }} className="pt-10">
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate(`/core/${RoutePath.HOME}`);
            }}
          >
            <ListItemIcon>
              <img
                className=""
                width={25}
                src={"/images/home-icon.svg"}
                alt="home-icon"
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  className="font-inter text-[#243831]"
                  sx={{ fontWeight: getFocusMemu(RoutePath.HOME) ? 800 : 400 }}
                >
                  Home
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>

        {token && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/core/${RoutePath.OUR_BLOG}`);
              }}
            >
              <ListItemIcon>
                <img
                  className=""
                  width={25}
                  src={"/images/edit-icon.svg"}
                  alt="home-icon"
                />
              </ListItemIcon>

              <Typography
                className="font-inter text-[#243831]"
                sx={{
                  fontWeight: getFocusMemu(RoutePath.OUR_BLOG) ? 800 : 400,
                }}
              >
                Our Blog
              </Typography>
            </ListItemButton>
          </ListItem>
        )}
      </Box>
    </Drawer>
  );
};

export default Menu;
