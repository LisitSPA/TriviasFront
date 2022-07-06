import React from "react";
import { Box, Typography } from "@mui/material";
import imgPlataforma from "../../../images/trivias/plataforma.png";
import imgPuntuacion from "../../../images/trivias/puntuacion.png";

interface TriviasProps {
  id: string;
  imgPuntuacion: string;
  imgTrivia: string;
  handleClick: (id: string) => void;
  puntajeMaximo: string;
  puntajeObtenido: number;
  bloqueada: boolean;
}

const TriviasComponent = (props: TriviasProps) => {
  return (
    <Box
      className={"flex center column"}
      sx={{
        width: "40%",
        height: "50vh",
      }}
    >
      {(() => {
        if (props.puntajeObtenido === 0 && props.bloqueada) {
          return (
            <Box
              sx={{
                boxSizing: "border-box",
              }}
            >
              <Box
                id="prueba"
                className={"config-img flex center column contain"}
                sx={{
                  backgroundImage: `url(${imgPuntuacion})`,
                  width: "300px",
                  height: "100px",
                }}
              >
                <Typography
                  variant={"h6"}
                  color={"white"}
                  sx={{ textAlign: "center", fontWeight: "bold", pb: 2 }}
                >
                  ¡Puntuación {props.puntajeObtenido}/{props.puntajeMaximo}
                </Typography>
              </Box>
              <Box
                className={"config-img"}
                sx={{
                  backgroundImage: `url(${props.imgTrivia})`,
                  filter: "grayscale(100%)",
                  width: "300px",
                  height: "300px",
                  border: "5px solid #FFFFFF",
                  borderRadius: 50,
                }}
                onClick={() => {}}
              ></Box>
              <Box
                className={"config-img contain"}
                sx={{
                  backgroundImage: `url(${imgPlataforma})`,
                  width: "300px",
                  height: "200px",
                }}
              ></Box>
            </Box>
          );
        } else {
          return (
            <Box
              className={"effect-apper"}
              sx={{
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <Box
                id="prueba"
                className={"config-img flex center column contain"}
                sx={{
                  backgroundImage: `url(${imgPuntuacion})`,
                  width: "300px",
                  height: "100px",
                }}
              >
                <Typography
                  variant={"h6"}
                  color={"white"}
                  sx={{ textAlign: "center", fontWeight: "bold", pb: 2 }}
                >
                  ¡Puntuación {props.puntajeObtenido}/{props.puntajeMaximo}
                </Typography>
              </Box>
              <Box
                className={"config-img effect-trivia"}
                sx={{
                  backgroundImage: `url(${props.imgTrivia})`,
                  width: "300px",
                  height: "300px",
                  border: "5px solid #FFFFFF",
                  borderRadius: 50,
                }}
                onClick={() => props.handleClick(props.id)}
              ></Box>
              <Box
                className={"config-img contain"}
                sx={{
                  backgroundImage: `url(${imgPlataforma})`,
                  width: "300px",
                  height: "200px",
                }}
              ></Box>
            </Box>
          );
        }
      })()}
    </Box>
  );
};

export default TriviasComponent;
