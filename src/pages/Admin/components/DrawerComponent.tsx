import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PublicIcon from "@mui/icons-material/Public";
import MuiDrawer from "@mui/material/Drawer";
import QuizIcon from "@mui/icons-material/Quiz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface PropsDrawer {
  open: boolean;
  toogleDrawer: () => void;
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const DrawerComponent = ({ open, toogleDrawer }: PropsDrawer) => {
  const [openWorlds, setOpenWorlds] = useState(false);
  const [openTrivias, setOpenTrivias] = useState(false);
  const navigate = useNavigate();

  const handleClickWorlds = () => {
    setOpenWorlds(!openWorlds);
  };

  const handleClickTrivias = () => {
    setOpenTrivias(!openTrivias);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{ ...(!open && { display: "none" }) }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toogleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <List component="nav">
        <ListItemButton onClick={handleClickWorlds}>
          <ListItemIcon>
            <PublicIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Mundos" />
          {openWorlds ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openWorlds} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("agregar_mundo")}
            >
              <ListItemIcon>
                <AddBoxIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("editar_mundo")}
            >
              <ListItemIcon>
                <EditIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary="Editar" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("borrar_mundo")}
            >
              <ListItemIcon>
                <DeleteIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Eliminar" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClickTrivias}>
          <ListItemIcon>
            <QuizIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Trivias" />
          {openTrivias ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openTrivias} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AddBoxIcon color="success" />
              </ListItemIcon>
              <ListItemText primary="Agregar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <EditIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary="Editar" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DeleteIcon color="error" />
              </ListItemIcon>
              <ListItemText primary="Eliminar" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default DrawerComponent;
