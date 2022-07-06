import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AutcompleteAsync from "./AutocompleteAsync";
import DeleteIcon from "@mui/icons-material/Delete";
import WorldComponent from "../../Worlds/components/WorldComponent";

const DeleteWorld = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [nameWorld, setNameWorld] = useState("");
  const [showImgBackground, setShowImgBackground] = useState("");
  const [imgBackground, setImgBackground] = useState("");
  const [showImgWorld, setShowImgWorld] = useState("");
  const [imgWorld, setImgWorld] = useState("");
  const [showWorldLock, setShowWorldLock] = useState("");
  const [imgWorldLock, setImgWorldLock] = useState("");

  const handleChange = (e: any) => {
    console.log(e);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography component={"h1"} variant="h4" style={{ color: "#FFFFFF" }}>
          Eliminar Mundo
        </Typography>
        <AutcompleteAsync
          endpoint={
            "https://trivias-api.azurewebsites.net/api/Mundos/ObtenerMundos"
          }
          token={accessToken || ""}
          placeholder={"Buscar Mundo"}
          handleInput={handleChange}
        />
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ marginTop: "30px" }}
          onClick={() => {}}
        >
          Eliminar Mundo
        </Button>
        <Typography
          component={"h1"}
          variant="h4"
          style={{ color: "#FFFFFF", marginTop: "40px" }}
        >
          Previsualización Mundo
        </Typography>
        <Box
          sx={{
            backgroundImage: `url(${showImgBackground})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <WorldComponent
            id="1"
            title={nameWorld}
            img={showImgWorld}
            lock={false}
            handleClick={() => {}}
            triviasApproved={0}
            triviasTotal={0}
          />
          <WorldComponent
            id="1"
            title={nameWorld}
            img={showWorldLock}
            lock={false}
            handleClick={() => {}}
            triviasApproved={0}
            triviasTotal={0}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default DeleteWorld;
