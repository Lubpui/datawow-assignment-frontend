import {
  AppBar,
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
import { useState } from "react";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../utils/route.util";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
  paddingTop: "20px",
}));

const Header = () => {
  const navigate = useNavigate();
  const mobileMatches = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(800)
  );

  const [openMenu, setOpenMenu] = useState(false);

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
              <ListItemText primary={"Home"} className="text-[#BBC2C0]" />
            </ListItemButton>
          </ListItem>

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
                  src={"/images/edit-icon-white.svg"}
                  alt="home-icon"
                />
              </ListItemIcon>
              <ListItemText primary={"Our Blog"} className="text-[#BBC2C0]" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
