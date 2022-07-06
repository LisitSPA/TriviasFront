import React from 'react';
import imgCard from "../../../images/rewards/card_premios.png";
import {Box, Typography} from "@mui/material";

interface PropsCard{
  image: string;
  title: string;
  points: string;
}

const CardRewards = (props: PropsCard) => {
  return (
    <Box className={"config-img contain"} sx={{
      backgroundImage: `url(${imgCard})`,
      width: "200px",
      height: "300px",
      display: "inline-block",
      margin: "20px"
    }}>
      <Box className={"flex center column"} sx={{ width: "100%", height: "100%"}}>
        <Box  className={"config-img contain"} sx={{
          backgroundImage: `url(${props.image})`,
          width: "100%",
          height: "70px"
        }}></Box>
        <Typography variant={"body1"} sx={{
          color: "#45AC34",
          margin: "20px 0 0 0"
        }}>{props.title}</Typography>
        <Typography variant={"body2"} mt={2} sx={{
          color: "#8C8B8E"
        }}>{props.points}</Typography>
      </Box>
    </Box>
  );
};

export default CardRewards;