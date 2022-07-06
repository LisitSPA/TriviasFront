import {Box, Typography} from "@mui/material";
import React from "react";

interface PropsCard {
  imgCard: string;
  icon?: string;
  text: string;
}

const Cards = (props: PropsCard) => {
  return (
    <Box
      className={"config-img contain"}
      sx={{
        backgroundImage: `url(${props.imgCard})`,
        width: "200px",
        height: "300px",
        display: "inline-block",
        margin: "20px",
      }}
    >
      <Box
        className={"flex center column"}
        sx={{width: "100%", height: "100%"}}
      >
        {props.icon &&
          <Box
            className={"config-img contain"}
            sx={{
              backgroundImage: `url(${props.icon})`,
              width: "100%",
              height: "70px",
            }}
          ></Box>
        }
        <Typography
          variant={"body2"}
          sx={{
            color: "#45AC34",
            margin: "10px 0 0 0",
            width: "85%",
            height: "90px",
          }}
        >
          {props.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Cards;
