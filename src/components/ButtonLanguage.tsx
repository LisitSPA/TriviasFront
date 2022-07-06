import React from "react";
import {Box} from "@mui/material";

interface PropsButton {
  urlIcon: string;
  action: (value: string) => void;
  value: string;
}

export const ButtonLanguage = (props: PropsButton) => {
  return (
    <Box
      className={"config-img contain effect-btn-lng"}
      style={{
        backgroundImage: `url(${props.urlIcon})`,
        width: "70px",
        height: "70px",
        margin: "0 20px",
        borderRadius: 50,
        cursor: "pointer",
        boxSizing: "border-box",
        transition: "all .1s",

      }}
      sx={{
        "&:hover": {
          border: "4px solid #98C21D"
        }
      }}
      onClick={() => props.action(props.value)}
    ></Box>
  );
};
