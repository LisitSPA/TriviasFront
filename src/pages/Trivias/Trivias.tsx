import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  listItemAvatarClasses,
  styled,
  Typography,
} from "@mui/material";
//* Components
import Navbar from "../../components/Navbar";
//* Images
import imgBackground from "../../images/backgrounds/fondo_lobby.png";
import logoCMPC from "../../images/logos/logo_cmpc.svg";
import imgTrivia1 from "../../images/trivias/trivia1.png";
import imgTrivia2 from "../../images/trivias/trivia2.png";
import imgPuntuacion from "../../images/trivias/puntuacion.png";
import flechaAtras from "../../images/icons/flecha_atras.png";
import flechaAdelante from "../../images/icons/flecha_sig.png";
//* Styles
import Container from "../../styles/Container";
import Body from "../../styles/Body";
import { useNavigate, useParams } from "react-router-dom";
import ButtonReturn from "../../components/ButtonReturn";
import "./styles.css";
import TriviasComponent from "./components/TriviasComponent";
import PaginationComponent from "../../components/PaginationComponent";
import axios from "axios";

type DivPropsBox = {
  backgroundUrlImage: string;
};

const BoxArrow = styled("div")<DivPropsBox>((props: DivPropsBox) => ({
  backgroundImage: `url(${props.backgroundUrlImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
  width: "100px",
  height: "100px",
  margin: "20px",
  cursor: "pointer",
}));

const Trivias = () => {
  const perPage = 2;
  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(2);
  const [siguiente, setSiguiente] = useState(2);
  const [lengthTrivias, setLengthTrivias] = useState(0);
  const [listTrivias, setListTrivias] = useState<any[]>([]);
  const [renderTrivias, setRenderTrivias] = useState<any[]>([]);
  const [showPrevious, setShowPrevious] = useState<boolean>(false);
  const [showNext, setShowNext] = useState<boolean>(true);
  const [backgroundWorld, setBackgroundWorld] = useState("");
  const { idMundo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrivias = async () => {
      await axios
        .get(
          `https://trivias-api.azurewebsites.net/api/Trivias/ObtenerTriviasDelUsuario/${idMundo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response: any) => {
          setListTrivias(response.data);
          setRenderTrivias(response.data.slice(index, perPage));
          setLengthTrivias(response.data.length);
          if (response.data.length <= 2) {
            setShowNext(false);
          }
        })
        .catch((error: any) => {
          if (error.response.status === 401) {
            navigate("/crear_perfil");
          }
        });
    };

    const fetchTriviasWorld = async () => {
      axios
        .get(
          `https://trivias-api.azurewebsites.net/api/Trivias/ObtenerTriviasDelMundo/${idMundo}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response: any) => {
          setBackgroundWorld(response.data[0].mundo.urlImgFondo);
        });
    };

    fetchTrivias();
    fetchTriviasWorld();
  }, []);

  useEffect(() => {
    console.log(`Index => ${index} ${limit} ${listTrivias.length}`);
    if (index + perPage > listTrivias.length && listTrivias.length !== 0) {
      console.log("Limite");
      if (listTrivias.length % 2 === 1) {
        setRenderTrivias(
          listTrivias.slice(listTrivias.length - 1, listTrivias.length)
        );
      } else {
        setRenderTrivias(
          listTrivias.slice(listTrivias.length - 2, listTrivias.length)
        );
      }
      setShowNext(false);
    } else {
      if (index === 0) {
        setRenderTrivias(listTrivias.slice(0, perPage));
        setShowPrevious(false);
      } else {
        setRenderTrivias(listTrivias.slice(index, limit));
      }
    }
  }, [index]);

  const handleClick = (idTrivia: string) => {
    navigate(`${idTrivia}/preguntas`);
  };

  const handleNextPage = () => {
    setIndex(index + perPage);
    setLimit(limit + perPage);

    setShowPrevious(true);
  };

  const handlePreviousPage = () => {
    setIndex(index - perPage);
    setLimit(limit - perPage);
    setShowNext(true);
  };

  return (
    <Container backgroundUrl={backgroundWorld}>
      <Navbar />
      <Body>
        <Grid container sx={{ marginTop: "5vh" }}>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(() => {
              if (showPrevious) {
                return (
                  <BoxArrow
                    backgroundUrlImage={flechaAtras}
                    onClick={handlePreviousPage}
                  ></BoxArrow>
                );
              }
            })()}
          </Grid>
          <Grid item xs={8}>
            <Typography
              variant={"h3"}
              color={"white"}
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              ¡Iniciemos nuestro viaje!
            </Typography>
            <Box className={"flex"} sx={{ justifyContent: "center" }}>
              {renderTrivias.map((trivia: any) => (
                <TriviasComponent
                  key={trivia.idTrivia}
                  id={trivia.idTrivia}
                  puntajeObtenido={trivia.puntajeObtenido}
                  puntajeMaximo={trivia.puntajeMaximo}
                  imgPuntuacion={trivia.imgPuntuacion}
                  imgTrivia={trivia.imgUrl}
                  handleClick={handleClick}
                  bloqueada={trivia.bloqueado}
                />
              ))}
            </Box>
            <Box
              sx={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${logoCMPC})`,
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  width: "10vw",
                  height: "10vh",
                  float: "right",
                }}
              ></Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(() => {
              if (showNext && listTrivias.length > 0) {
                return (
                  <BoxArrow
                    backgroundUrlImage={flechaAdelante}
                    onClick={handleNextPage}
                  ></BoxArrow>
                );
              }
            })()}
          </Grid>
        </Grid>
      </Body>
    </Container>
  );
};

export default Trivias;
