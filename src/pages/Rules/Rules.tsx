import React from 'react';
//* MUI
import {Grid} from "@mui/material";
//* Components
import Navbar from "../../components/Navbar";
//* Images
import backgroundImg from "../../images/backgrounds/fondo_lobby.png";
import imgCard01 from "../../images/cards/card01.png";
import imgCard02 from "../../images/cards/card02.png";
import imgCard03 from "../../images/cards/card03.png";
import imgCard04 from "../../images/cards/card04.png";
import imgCard05 from "../../images/cards/card05.png";
import imgCard06 from "../../images/cards/card06.png";
import imgCard07 from "../../images/cards/card06.png";
import imgCard08 from "../../images/cards/card06.png";
//* Styles
import Container from "../../styles/Container";
import Body from "../../styles/Body";
import Cards from "../../components/Cards";
import {useTranslation} from "react-i18next";

const Rules = () => {

  const [translate] = useTranslation("rules")

  return (
    <Container backgroundUrl={backgroundImg}>
      <Navbar/>
      <Body>
        <Grid container className={"flex center"} sx={{
          width: "100%",
          height: "80vh"
        }}>
          <Grid item xs={10} sx={{
            textAlign: "center"
          }}>
            <Cards imgCard={imgCard01} text={translate("rule1")}/>
            <Cards imgCard={imgCard02} text={translate("rule2")}/>
            <Cards imgCard={imgCard03} text={translate("rule3")}/>
            <Cards imgCard={imgCard04} text={translate("rule4")}/>
            <Cards imgCard={imgCard05} text={translate("rule5")}/>
            <Cards imgCard={imgCard06} text={translate("rule6")}/>
            <Cards imgCard={imgCard07} text={translate("rule7")}/>
            <Cards imgCard={imgCard08} text={translate("rule8")}/>
          </Grid>
        </Grid>
      </Body>
    </Container>
  );
};

export default Rules;