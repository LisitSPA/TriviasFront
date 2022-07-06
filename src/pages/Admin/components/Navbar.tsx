import { IconButton, Menu, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import React from "react";

interface PropsNavbar {
  toogleDrawer: () => void;
  open: boolean;
}

const drawerWidth: number = 240;

const AppBar: any = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<PropsNavbar>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Navbar = ({ toogleDrawer, open }: PropsNavbar) => {
  return (
    <AppBar
      position="absolute"
      open={open}
      sx={{ backgroundColor: "transparent" }}
    >
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
          onClick={toogleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component={"h1"} sx={{ flexGrow: 1 }}>
          Panel de Administración
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
