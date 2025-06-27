import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useMemo, useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../../utils/route.util";
import { cookieConstants } from "../../constants/localStorage.constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { logout } from "../../store/slices/auth.slice";
import { useAppDispatch } from "../../store/store";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  paddingTop: "20px",
}));

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const token = Cookies.get(cookieConstants.TOKEN_KEY);

  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  const [openMenu, setOpenMenu] = useState(false);

  const getFocusMemu = useMemo(
    () => (path: string) => {
      return location.pathname.includes(path);
    },
    [location]
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "none",
          zIndex: (theme) => theme.zIndex.drawer + (mobileMatches ? 0 : 1),
        }}
        className="h-[64px]"
      >
        <Toolbar
          className="pr-0 h-[64px]"
          sx={{
            justifyContent: "space-between",
            background: "#243831",
          }}
        >
          <Typography
            sx={{ fontSize: "24px" }}
            className="text-white italic font-castoro"
          >
            a Board
          </Typography>

          {mobileMatches ? (
            <IconButton onClick={() => setOpenMenu(true)}>
              <MenuRoundedIcon className="text-white" />
            </IconButton>
          ) : token ? (
            <Box
              className="flex items-center gap-4 cursor-pointer rounded-[8px] px-4 py-2 hover:bg-[#ffffff15]"
              onClick={() => {
                dispatch(logout());
                navigate(`/${RoutePath.LOGIN}`);
              }}
            >
              <Typography className="font-inter font-medium text-white">
                {(jwtDecode(token) as { username: string }).username}
              </Typography>
              <Avatar
                className="h-[31px] w-[31px]"
                src="/images/avatar-icon.svg"
              />
            </Box>
          ) : (
            <Button
              color="success"
              className="h-[44px] normal-case"
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
              onClick={() => navigate(`/${RoutePath.LOGIN}`)}
            >
              <Typography className="text-white text-[14px] font-semibold normal-case">
                Sign in
              </Typography>
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"right"}
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        sx={{
          width: 280,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            border: "none",
            backgroundColor: "#243831",
            width: 280,
            boxSizing: "border-box",
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpenMenu(false)}>
            <ArrowForwardRoundedIcon className="text-white" />
          </IconButton>
        </DrawerHeader>

        <Box sx={{ overflow: "auto" }} className="pt-5">
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenMenu(false);
                navigate(`/core/${RoutePath.HOME}`);
              }}
            >
              <ListItemIcon>
                <img
                  width={25}
                  src={"/images/home-icon-white.svg"}
                  alt="home-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    className="font-inter text-[#BBC2C0]"
                    sx={{
                      fontWeight: getFocusMemu(RoutePath.HOME) ? 800 : 400,
                    }}
                  >
                    Home
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                setOpenMenu(false);
                navigate(`/core/${RoutePath.OUR_BLOG}`);
              }}
            >
              <ListItemIcon>
                <img
                  className=""
                  width={25}
                  src={"/images/edit-icon-white.svg"}
                  alt="home-icon"
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    className="font-inter text-[#BBC2C0]"
                    sx={{
                      fontWeight: getFocusMemu(RoutePath.OUR_BLOG) ? 800 : 400,
                    }}
                  >
                    Our Blog
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
