import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
//* Container
import Navbar from "../../components/Navbar";
//* Images
import imgBackground from "../../images/backgrounds/fondo_lobby.png";
import imgFotoPerfil from "../../images/logos/foto_perfil.png";
import imgFotoPerfilHover from "../../images/logos/hover_foto_perfil.png";
import icoEsp from "../../images/icons/ico_esp.png";
import icoPor from "../../images/icons/ico_por.png";
import icoEng from "../../images/icons/ico_en.png";
//* Styles
import Container from "../../styles/Container";
import Body from "../../styles/Body";
import {Alert, Box, Grid, Typography} from "@mui/material";
import axios, {AxiosError} from "axios";

const EditProfile = () => {
  const langEs = useRef<HTMLElement>(null);
  const langPor = useRef<HTMLElement>(null);
  const langEn = useRef<HTMLElement>(null);
  const [translate] = useTranslation("edit_profile");
  const [urlImage, setUrlImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [idioma, setIdioma] = useState("");
  const [email, setEmail] = useState("");
  const [hiddenAlert, setHiddenAlert] = useState("none");
  const [textAlert, setTextAlert] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://trivias-api.azurewebsites.net/api/Usuarios/ObtenerInfoUsuario",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response: any) => {
        console.log("Obtener DATA =>", response.data);
        setUrlImage(response.data.urlImagenPerfil);
        setNickname(response.data.nickName);
        setIdioma(response.data.idioma);
        setEmail(response.data.email);
      })
      .catch((error: AxiosError) => {
        console.log("Error => ", error)
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("DATA =>", idioma, email, urlImage, nickname);

    axios
      .put(
        "https://trivias-api.azurewebsites.net/api/Usuarios/ActualizarInfoUsuario",
        {
          idioma: idioma,
          correo: email,
          urlImagenPerfil: urlImage,
          nickName: nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((resopnse: any) => {
        console.log("Respuesta =>", resopnse);
      })
      .catch((error: AxiosError) => {
        console.log("Error => ", error)
        if (error.response?.status === 400) {
          setHiddenAlert("block");
          setTextAlert("El alias ingresado no es admitido")
        }
      });
  };

  const handleClickLanguage = (value: string) => {
    setIdioma(value);
  };

  const handleChangeNickname = (e: any) => {
    setNickname(e.target.value);
  };

  return (
    <Container backgroundUrl={imgBackground}>
      <Navbar/>
      <Body>
        <Grid
          container
          justifyContent={"center"}
          sx={{
            flex: "1 0 auto",
          }}
        >
          <Grid item xs={12}>
            <Typography
              variant={"h2"}
              color={"white"}
              style={{textAlign: "center", margin: "5vh 0"}}
            >
              {translate("title")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                backgroundImage: `url(${urlImage})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "200px",
                height: "200px",
                transition: "all .3s",
                margin: "0 auto",
                cursor: "pointer",
                borderRadius: "100%",
                "&:hover": {
                  backgroundImage: `url(${imgFotoPerfilHover})`,
                },
              }}
            ></Box>
          </Grid>
          <Grid item xs={12}>
            <form className={"flex center column"} onSubmit={handleSubmit}>
              <input
                type="text"
                className={"input-form"}
                placeholder={translate("inputSubnegocio")}
                defaultValue={nickname}
                onChange={handleChangeNickname}
              />
              <Box className={"flex center"}>
                <Box
                  ref={langEs}
                  id="es"
                  className={"config-img"}
                  sx={{
                    backgroundImage: `url(${icoEsp})`,
                    width: "70px",
                    height: "70px",
                    margin: "20px",
                    borderRadius: 50,
                    cursor: "pointer",
                    boxSizing: "border-box",
                    "&:hover": {
                      border: "4px solid #98C21D",
                    },
                  }}
                  onClick={() => handleClickLanguage("ESP")}
                ></Box>
                <Box
                  ref={langPor}
                  id="por"
                  className={"config-img"}
                  sx={{
                    backgroundImage: `url(${icoPor})`,
                    width: "70px",
                    height: "70px",
                    margin: "20px",
                    borderRadius: 50,
                    cursor: "pointer",
                    boxSizing: "border-box",
                    "&:hover": {
                      border: "4px solid #98C21D",
                    },
                  }}
                  onClick={() => handleClickLanguage("POR")}
                ></Box>
                <Box
                  ref={langEn}
                  id="en"
                  className={"config-img"}
                  sx={{
                    backgroundImage: `url(${icoEng})`,
                    width: "70px",
                    height: "70px",
                    margin: "20px",
                    borderRadius: 50,
                    cursor: "pointer",
                    boxSizing: "border-box",
                    "&:hover": {
                      border: "4px solid #98C21D",
                    },
                  }}
                  onClick={() => handleClickLanguage("ENG")}
                ></Box>
              </Box>
              <input
                type="submit"
                className={"btn-green-light"}
                style={{marginTop: "10px"}}
                value={translate("button")}
              />
              <Box sx={{display: hiddenAlert}}>
                <Alert severity="error" style={{marginTop: "10px"}}>
                  {textAlert}
                </Alert>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Body>
    </Container>
  );
};

export default EditProfile;
