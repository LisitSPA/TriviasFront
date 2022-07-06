import React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation} from "react-i18next";
import {Box, Button, Grid} from "@mui/material";
//* Images
import backgroundImg from "../../images/backgrounds/fondo_azul.png";
import imgLogoTrivias from "../../images/logos/logoTrivia.png";
import flechaAdelante from "../../images/icons/flecha_adelante.png";
//* Styles
import Container from "../../styles/Container";

const VideoPreview = () => {

  const navigate = useNavigate();
  const [translate] = useTranslation("first_steps");

  const handleClick = () => {
    navigate("/crear_perfil");
  }

  return (
    <Container backgroundUrl={backgroundImg}>
      <Box className={"config-img contain"} sx={{
        backgroundImage: `url(${imgLogoTrivias})`,
        width: "20%",
        height: "12vh",
        position: "relative",
      }}></Box>
      <Grid container >
        <Grid item xs={12} sx={{ margin: "20px 0"}}>
          <Box  className={"flex center"} sx={{
            width: "70%",
            height: "60vh",
            backgroundColor:"#729C38",
            opacity: ".7",
            borderRadius: 10,
            margin: "0 auto"
          }}>
            <Box sx={{
              width: "70%",
              height: "90%"
            }}>
              <div style={{padding:"56.25% 0 0 0",position:"relative"}}>
                <iframe
                  title={"intro trivias"}
                  src="https://player.vimeo.com/video/492564839?h=46cbf23dee&autoplay=1&color=c9ff23&title=0&byline=0&portrait=0"
                  style={{position:"absolute",top:"0",left:"0",width:"100%", height:"100%", borderRadius: "10px"}} frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box className={"flex center"}>
        <Button className={"btn-green-light"} onClick={handleClick}>{translate("button")} <span
          className={"config-img contain"}
          style={{backgroundImage: `url(${flechaAdelante})`, width: "15px", height: "15px", marginLeft: "10px"}}></span></Button>
      </Box>
    </Container>
  );
};

export default VideoPreview;