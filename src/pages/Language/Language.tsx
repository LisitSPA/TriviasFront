import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {Box} from "@mui/material";
//* Components
import {ButtonLanguage} from "../../components/ButtonLanguage";
//* Images
import imgBackground from "../../images/backgrounds/fondo_lobby.png";
import imgCMPC from "../../images/logos/logo_cmpc.svg";
import imgTrivias from "../../images/logos/logoTrivia.png";
import icoEsp from "../../images/icons/ico_esp.png";
import icoPor from "../../images/icons/ico_por.png";
import icoEng from "../../images/icons/ico_en.png";
//* Styles
import Container from "../../styles/Container";

export const Language = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const handleClickLanguage = (language: string) => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
    navigate("/primeros_pasos");
  };

  return (
    <Container backgroundUrl={imgBackground} className={"flex center column"}>
      <Box className={"config-img contain"} sx={{
        backgroundImage: `url(${imgCMPC})`,
        width: "10%",
        height: "10vh",
      }}></Box>
      <Box className={"config-img contain"} sx={{
        backgroundImage: `url(${imgTrivias})`,
        width: "40%",
        height: "25vh",
        margin: "20px 0"
      }}></Box>
      <Box className={"flex center"} sx={{
        width: "50%",
        height: "10vh",
      }}>
        <Box
          className={"flex center"}
          sx={{
            width: "50%",
            height: "10vh",
          }}
        >
          <ButtonLanguage
            urlIcon={icoEsp}
            action={handleClickLanguage}
            value="esp"
          />
          <ButtonLanguage
            urlIcon={icoPor}
            action={handleClickLanguage}
            value="por"
          />
          <ButtonLanguage
            urlIcon={icoEng}
            action={handleClickLanguage}
            value="eng"
          />
        </Box>
      </Box>
    </Container>
  );
};
