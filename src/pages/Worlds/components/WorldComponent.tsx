import React from "react";
import { Box, Typography } from "@mui/material";
import "../styles.css";

interface WordProps {
  id: string;
  title: string;
  img: string;
  lock: boolean;
  handleClick?: any;
  triviasApproved: number;
  triviasTotal: number;
}

const WorldComponent = (props: WordProps) => {
  if (props.lock) {
    return (
      <Box
        className="flex center column"
        sx={{
          width: "450px",
          height: "450px",
        }}
      >
        <Typography variant={"h4"} className={"title-world"}>
          {props.title}
        </Typography>
        <Box
          className={"config-img contain"}
          sx={{
            position: "relative",
            backgroundImage: `url(${props.img})`,
            width: "300px",
            height: "300px",
            borderRadius: 50,
          }}
          onClick={() => {}}
        ></Box>
      </Box>
    );
  } else {
    return (
      <Box
        className="flex center column"
        sx={{
          width: "450px",
          height: "450px",
        }}
      >
        <Typography variant={"h4"} className={"title-world"}>
          {props.title}
        </Typography>
        <Box
          className={"config-img contain container-world"}
          sx={{
            position: "relative",
            backgroundImage: `url(${props.img})`,
            width: "300px",
            height: "300px",
            borderRadius: 50,
            cursor: "pointer",
          }}
          onClick={() => {
            props.handleClick(props.id);
          }}
        ></Box>
        <Box className="input-world">
          <p style={{ color: "green", fontSize: "2rem", textAlign: "center" }}>
            {" "}
            {props.triviasApproved} / {props.triviasTotal}
          </p>
        </Box>
      </Box>
    );
  }
};

export default WorldComponent;
