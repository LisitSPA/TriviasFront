import React from "react";
import { useTranslation } from "react-i18next";
//* Components
import Navbar from "../../components/Navbar";
import CardRewards from "./components/CardRewards";
//* Images
import imgBackground from "../../images/backgrounds/fondo_lobby.png";
import imgAmazon from "../../images/rewards/amazon.png";
import imgNetflix from "../../images/rewards/netflix.png";
import imgReflector from "../../images/rewards/reflectores.png";
//* Styles
import Container from "../../styles/Container";
import Body from "../../styles/Body";
import { Box, Grid, Typography } from "@mui/material";

const Rewards = () => {
  const [translate] = useTranslation("reward");

  return (
    <Container backgroundUrl={imgBackground}>
      <Navbar />
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
              style={{ textAlign: "center", margin: "5vh 0" }}
            >
              {translate("title")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box
              className={"config-img contain"}
              sx={{
                backgroundImage: `url(${imgReflector})`,
                width: "80%",
                height: "100px",
                margin: "0 auto",
              }}
            ></Box>
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              textAlign: "center",
            }}
          >
            <CardRewards image={imgAmazon} title={"Amazon 1 mes"} points={""} />
            <CardRewards image={imgAmazon} title={"Amazon 3 mes"} points={""} />
            <CardRewards image={imgAmazon} title={"Amazon 1 año"} points={""} />
            <CardRewards
              image={imgNetflix}
              title={"Netflix 1 mes"}
              points={""}
            />
            <CardRewards
              image={imgNetflix}
              title={"Netflix 3 mes"}
              points={""}
            />
            <CardRewards
              image={imgNetflix}
              title={"Netflix 1 año"}
              points={""}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant={"h3"}
              color={"white"}
              style={{ textAlign: "center", margin: "5vh 0" }}
            >
              {translate("score")}: 0
            </Typography>
          </Grid>
        </Grid>
      </Body>
    </Container>
  );
};

export default Rewards;
