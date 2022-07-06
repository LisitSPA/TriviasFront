import React from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Box, Button, Grid, Typography} from "@mui/material";
//* Components
import Container from "../../styles/Container";
import Card from "./components/Card";

// * Images
import imgBackground from "../../images/backgrounds/fondo_azul.png";
import imgLogoTrivias from "../../images/logos/logoTrivia.png";
import imgCard01 from "../../images/cards/card01.png";
import imgCard02 from "../../images/cards/card02.png";
import imgCard03 from "../../images/cards/card03.png";
import imgCard04 from "../../images/cards/card04.png";
import imgCard05 from "../../images/cards/card05.png";
import imgCard06 from "../../images/cards/card06.png";
import icon01 from "../../images/icons/icono_1.png";
import icon02 from "../../images/icons/icono_2.png";
import icon03 from "../../images/icons/icono_3.png";
import icon04 from "../../images/icons/icono_4.png";
import icon05 from "../../images/icons/icono_5.png";
import icon06 from "../../images/icons/icono_6.png";
import flechaAdelante from "../../images/icons/flecha_adelante.png";

const FirstSteps = () => {
  const navigate = useNavigate();
  const [translate] = useTranslation("first_steps");

  const handleClick = () => {
    navigate("/video_inicio");
  };

  return (
    <Container backgroundUrl={imgBackground}>

      <Box className={"config-img contain"} sx={{
        backgroundImage: `url(${imgLogoTrivias})`,
        width: "20%",
        height: "12vh",
        position: "relative",
      }}></Box>
      <Box className={"flex center column"} sx={{
        width: "100%",
        marginTop: "5vh",
      }}>
        <Typography variant={"h1"} color={"white"}
                    style={{fontWeight: "bold", margin: "5vh 0", textAlign: "center"}}>{translate('header')}</Typography>
        <Grid item xs={11} sx={{
          textAlign: "center"
        }}>
          <Card imgCard={imgCard01} icon={icon01} text={translate('card1')}/>
          <Card imgCard={imgCard02} icon={icon02} text={translate('card2')}/>
          <Card imgCard={imgCard03} icon={icon03} text={translate('card3')}/>
          <Card imgCard={imgCard04} icon={icon04} text={translate('card4')}/>
          <Card imgCard={imgCard05} icon={icon05} text={translate('card5')}/>
          <Card imgCard={imgCard06} icon={icon06} text={translate('card6')}/>
        </Grid>
        <Button className={"btn-green-light"} sx={{marginTop: "10vh"}}
                onClick={handleClick}>{translate('button')} <span
          className={"config-img contain"}
          style={{backgroundImage: `url(${flechaAdelante})`, width: "15px", height: "15px", marginLeft: "10px"}}></span></Button>
      </Box>
    </Container>
  );
};

export default FirstSteps;
