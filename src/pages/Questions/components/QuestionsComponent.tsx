import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import "../styles.css";

interface preguntas {
  nomTrivia: any;
  opcion: string;
  isCorrect: boolean;
  action: (value: boolean) => void;
}

const QuestionsComponent = (props: preguntas) => {
  return (
    <Box className={"contenedor"} onClick={() => props.action(props.isCorrect)}>
      <Box className={"contenedor-informaesto"}>
        <Typography
          variant={"h6"}
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: "green",
            marginLeft: "30px",
          }}
        >
          {props.nomTrivia}
        </Typography>
      </Box>
      <Typography
        className={"contenedor-circulo"}
        variant={"h4"}
        style={{ fontWeight: "bold", textAlign: "center", color: "white" }}
      >
        {props.opcion}
      </Typography>
    </Box>
  );
};

export default QuestionsComponent;
