import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddBoxIcon from "@mui/icons-material/AddBox";
import React, { useState } from "react";
import WorldComponent from "../../Worlds/components/WorldComponent";
import axios from "axios";

const AddWorld = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [nameWorld, setNameWorld] = useState("");
  const [showImgBackground, setShowImgBackground] = useState("");
  const [imgBackground, setImgBackground] = useState("");
  const [showImgWorld, setShowImgWorld] = useState("");
  const [imgWorld, setImgWorld] = useState("");
  const [showWorldLock, setShowWorldLock] = useState("");
  const [imgWorldLock, setImgWorldLock] = useState("");

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

  const handleClickSend = async () => {
    let formDataBackground = new FormData();
    let blobBackground = new Blob([imgBackground], { type: "image/jpg" });
    formDataBackground.append("archivoImagen", blobBackground);
    formDataBackground.append("extension", "jpg");
    let data = {
      nombre: nameWorld,
      urlImagen600: "",
      urlImgBlock: "",
      urlImgFondo: "",
    };

    //* Cargar imagen fondo
    await axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Miscelaneos/GuardarImagen",
        formDataBackground,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response: any) => {
        console.log("Respuesta OK background =>", response);
        data.urlImgFondo = response.data;
      })
      .catch((response: any) => {
        console.log("Respuesta ERROR background =>", response);
      });

    //* Cargar imagen mundo

    let formDataWorld = new FormData();
    let blobWorld = new Blob([imgWorld], { type: "image/jpg" });
    formDataWorld.append("archivoImagen", blobWorld);
    formDataWorld.append("extension", "jpg");

    await axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Miscelaneos/GuardarImagen",
        formDataWorld,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response: any) => {
        console.log("Respuesta OK world =>", response);
        data.urlImagen600 = response.data;
      })
      .catch((response: any) => {
        console.log("Respuesta ERROR world =>", response);
      });

    //* Cargar imagen mundo bloqueado
    let formDataLock = new FormData();
    let blobLock = new Blob([imgWorldLock], { type: "image/jpg" });
    formDataLock.append("archivoImagen", blobLock);
    formDataLock.append("extension", "jpg");

    await axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Miscelaneos/GuardarImagen",
        formDataLock,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response: any) => {
        console.log("Respuesta OK lock =>", response);
        data.urlImgBlock = response.data;
      })
      .catch((response: any) => {
        console.log("Respuesta ERROR lock =>", response);
      });

    console.log("Data cargada => ", data);

    //* Actualizar mundo
    await axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Mundos/CrearMundo",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("Todo listo => ", response.data);
      })
      .catch((error: any) => {
        console.log("Error => ", error);
      });
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
          Agregar Mundo
        </Typography>
        <input
          type="text"
          className={"input-form"}
          style={{ marginTop: "20px" }}
          placeholder={"Nombre del mundo"}
          defaultValue={nameWorld}
          onChange={handleNameWorld}
        />
        <Box sx={{ position: "relative", height: "auto", marginTop: "20px" }}>
          <label htmlFor="contained-img-background" style={{ margin: "30px" }}>
            <Button
              variant="contained"
              component="label"
              sx={{ maxWidth: "200px" }}
              startIcon={<AddAPhotoIcon />}
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
          <label htmlFor="contained-img-background" style={{ margin: "30px" }}>
            <Button
              variant="contained"
              component="label"
              sx={{ maxWidth: "300px" }}
              startIcon={<AddAPhotoIcon />}
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
          <label htmlFor="contained-img-background" style={{ margin: "30px" }}>
            <Button
              variant="contained"
              component="label"
              sx={{ maxWidth: "300px" }}
              startIcon={<AddAPhotoIcon />}
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
          color="success"
          startIcon={<AddBoxIcon />}
          sx={{ marginTop: "30px" }}
          onClick={handleClickSend}
        >
          Agregar
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

export default AddWorld;
