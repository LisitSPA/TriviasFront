import {Box, Button, Grid, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import AutcompleteAsync from "./AutocompleteAsync";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddBoxIcon from "@mui/icons-material/AddBox";
import WorldComponent from "../../Worlds/components/WorldComponent";

const EditWorld = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [worlds, setWorlds] = useState([]);
  const [worldSelected, setWorldSelected] = useState<any>({});
  //Edited
  const [nameWorld, setNameWorld] = useState("");
  const [showImgBackground, setShowImgBackground] = useState("");
  const [imgBackground, setImgBackground] = useState("");
  const [showImgWorld, setShowImgWorld] = useState("");
  const [imgWorld, setImgWorld] = useState("");
  const [showWorldLock, setShowWorldLock] = useState("");
  const [imgWorldLock, setImgWorldLock] = useState("");

  useEffect(() => {
    const fetchWorlds = async () => {
      await axios
        .get("https://trivias-api.azurewebsites.net/api/Mundos/ObtenerMundos", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: any) => {
          setWorlds(response.data);
        });
    };
    fetchWorlds();
  }, []);

  const handleChange = (event: any) => {
    const findWorld: any = worlds.find(
      (element: any) => element.nombre === event
    );
    setWorldSelected(findWorld);
    setShowImgBackground(findWorld.urlImgFondo);
    setShowImgWorld(findWorld.urlImg600);
    setShowWorldLock(findWorld.urlImgBlock);
    setNameWorld(event);
  };

  const handleNameWorld = (e: any) => {
    setNameWorld(e.target.value);
  };

  const handleBackground = (e: any) => {
    setShowImgBackground(URL.createObjectURL(e.target.files[0]));
    setImgBackground(e.target.files[0]);
  };

  const handleImgWorld = (e: any) => {
    setShowImgWorld(URL.createObjectURL(e.target.files[0]));
    setImgWorld(e.target.files[0]);
  };

  const handleImgLock = (e: any) => {
    setShowWorldLock(URL.createObjectURL(e.target.files[0]));
    setImgWorldLock(e.target.files[0]);
  };

  const handleEditWorld = () => {

  }

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
        <Typography component={"h1"} variant="h4" style={{color: "#FFFFFF"}}>
          Editar Mundo
        </Typography>
        <AutcompleteAsync
          endpoint={
            "https://trivias-api.azurewebsites.net/api/Mundos/ObtenerMundos"
          }
          token={accessToken || ""}
          placeholder={"Buscar Mundo"}
          handleInput={handleChange}
        />
        <Box sx={{position: "relative", height: "auto", marginTop: "20px"}}>
          <label htmlFor="contained-input">
            <input
              type="text"
              className={"input-form"}
              style={{marginTop: "20px", display: "inline"}}
              placeholder={"Nombre del mundo"}
              defaultValue={nameWorld}
              onChange={handleNameWorld}
            />
          </label>
          <label htmlFor="contained-img-background" style={{margin: "30px"}}>
            <Button
              variant="contained"
              component="label"
              sx={{maxWidth: "200px"}}
              startIcon={<AddAPhotoIcon/>}
            >
              <input
                type="file"
                className={"input-form"}
                defaultValue={imgBackground}
                onChange={handleBackground}
                style={{
                  cursor: "pointer",
                  display: "none",
                }}
              />
              Imagen de fondo
            </Button>
          </label>
          <label htmlFor="contained-img-background" style={{margin: "30px"}}>
            <Button
              variant="contained"
              component="label"
              sx={{maxWidth: "300px"}}
              startIcon={<AddAPhotoIcon/>}
            >
              <input
                type="file"
                className={"input-form"}
                defaultValue={imgWorld}
                onChange={handleImgWorld}
                style={{
                  cursor: "pointer",
                  display: "none",
                }}
              />
              Imagen de mundo
            </Button>
          </label>
          <label htmlFor="contained-img-background" style={{margin: "30px"}}>
            <Button
              variant="contained"
              component="label"
              sx={{maxWidth: "300px"}}
              startIcon={<AddAPhotoIcon/>}
            >
              <input
                type="file"
                className={"input-form"}
                defaultValue={imgWorldLock}
                onChange={handleImgLock}
                style={{
                  cursor: "pointer",
                  display: "none",
                }}
              />
              Mundo bloqueado
            </Button>
          </label>
        </Box>
        <Button
          variant="contained"
          color="warning"
          startIcon={<AddBoxIcon/>}
          sx={{marginTop: "30px"}}
          onClick={handleEditWorld}
        >
          Editar Mundo
        </Button>
        <Typography
          component={"h1"}
          variant="h4"
          style={{color: "#FFFFFF", marginTop: "40px"}}
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
            handleClick={() => {
            }}
            triviasApproved={0}
            triviasTotal={0}
          />
          <WorldComponent
            id="1"
            title={nameWorld}
            img={showWorldLock}
            lock={false}
            handleClick={() => {
            }}
            triviasApproved={0}
            triviasTotal={0}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default EditWorld;
