import {
  Box,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { RoutePath } from "../../utils/route.util";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

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
          <ListItemButton onClick={() => {navigate(`/core/${RoutePath.HOME}`);}}>
            <ListItemIcon>
              <img
                className=""
                width={25}
                src={"/images/home-icon.svg"}
                alt="home-icon"
              />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => {navigate(`/core/${RoutePath.OUR_BLOG}`);}}>
            <ListItemIcon>
              <img
                className=""
                width={25}
                src={"/images/edit-icon.svg"}
                alt="home-icon"
              />
            </ListItemIcon>
            <ListItemText primary={"Our Blog"} />
          </ListItemButton>
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default Menu;
