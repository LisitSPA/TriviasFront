import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Button, Grid, Typography } from "@mui/material";
//* Components
import Navbar from "../../components/Navbar";
//* Images
import backgroundImg from "../../images/backgrounds/fondo_lobby.png";
import imgPersonaje1 from "../../images/characters/nivel_1.png";
import flechaAdelante from "../../images/icons/flecha_adelante.png";
//* Styles
import Container from "../../styles/Container";
import Body from "../../styles/Body";
import InputScore from "../../components/InputScore";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [translate] = useTranslation("home");
  const [totalPoints, setTotalPoints] = useState(0);
  const handleClick = () => {
    navigate("/mundos");
  };

  useEffect(() => {
    let user = parseJwt();
    axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Usuarios/ObtenerPuntaje",
        {
          idUsuario: user.IdUser,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response: any) => {
        setTotalPoints(response.data);
      })
      .catch((error: any) => {
        console.log("Error => ", error);

        if (error.response.code === 401) {
          navigate("crear_perfil");
        }
      });
  }, []);

  const parseJwt = (): any => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }
    return "";
  };

  return (
    <Container backgroundUrl={backgroundImg}>
      <Navbar />
      <Body>
        <Grid
          container
          sx={{
            width: "100%",
            height: "80vh",
          }}
        >
          <Grid item xs={6} className={"flex center"}>
            <Box
              className={"flex center column"}
              sx={{
                width: "50%",
                height: "80%",
                backgroundColor: "white",
                borderRadius: 10,
                boxShadow: "19px 0px 0px 0px #1D6032",
              }}
            >
              <Box
                className={"config-img contain"}
                sx={{
                  backgroundImage: `url(${imgPersonaje1})`,
                  width: "100%",
                  height: "60%",
                }}
              ></Box>
              <Grid
                container
                sx={{
                  boxSizing: "border-box",
                  padding: "20px",
                }}
              >
                <Grid
                  item
                  xs={12}
                  className={"flex"}
                  sx={{ justifyContent: "space-between", padding: "10px" }}
                >
                  <Typography variant={"h6"} style={{ fontWeight: "bold" }}>
                    CyberPoints
                  </Typography>
                  <InputScore score={totalPoints} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={"flex"}
                  sx={{ justifyContent: "space-between", padding: "10px" }}
                >
                  <Typography variant={"h6"} style={{ fontWeight: "bold" }}>
                    CyberCoins
                  </Typography>
                  <InputScore score={"0"} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6} className={"flex column center"}>
            <Typography
              variant={"h2"}
              color={"white"}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              {translate("title")}
            </Typography>
            <Button
              className={"btn-green-light"}
              sx={{ marginTop: "5vh" }}
              onClick={handleClick}
            >
              {translate("button")}{" "}
              <span
                className={"config-img contain"}
                style={{
                  backgroundImage: `url(${flechaAdelante})`,
                  width: "15px",
                  height: "15px",
                  marginLeft: "10px",
                }}
              ></span>
            </Button>
          </Grid>
        </Grid>
      </Body>
    </Container>
  );
};

export default Home;
