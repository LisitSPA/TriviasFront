import { Box, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import imgBackground from "../../images/backgrounds/fondo_azul.png";
import DrawerComponent from "./components/DrawerComponent";
import { Route, Routes } from "react-router-dom";
import AddWorld from "./components/AddWorld";
import EditWorld from "./components/EditWorld";
import DeleteWorld from "./components/DeleteWorld";

const Admin = () => {
  const [open, setOpen] = useState(false);

  const toogleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${imgBackground})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Navbar toogleDrawer={toogleDrawer} open={open} />
        <DrawerComponent open={open} toogleDrawer={toogleDrawer} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
            <Grid container>
              <Routes>
                <Route path="agregar_mundo" element={<AddWorld />} />
                <Route path="editar_mundo" element={<EditWorld />} />
                <Route path="borrar_mundo" element={<DeleteWorld />} />
              </Routes>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
