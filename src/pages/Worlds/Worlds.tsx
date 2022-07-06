import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, styled } from "@mui/material";
//* Components
import Navbar from "../../components/Navbar";
import Body from "../../styles/Body";
import WorldComponent from "./components/WorldComponent";
//* Images
import imgBackground from "../../images/backgrounds/fondo_azul.png";
import imgWord1 from "../../images/worlds/mundo1.png";
import imgWord2Block from "../../images/worlds/mundo2Bloc.png";
import imgWord3Block from "../../images/worlds/mundo3Bloc.png";
import flechaAtras from "../../images/icons/flecha_atras.png";
import flechaAdelante from "../../images/icons/flecha_sig.png";
//* Styles
import Container from "../../styles/Container";
import axios from "axios";
import PaginationComponent from "../../components/PaginationComponent";

type PropsWorld = {
  nombre: string;
  url: string;
  lock: boolean;
};

type DivProps = {
  backgroundUrl: string;
};

const BoxArrow = styled("div")<DivProps>((props: DivProps) => ({
  backgroundImage: `url(${props.backgroundUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
  width: "100px",
  height: "100px",
  margin: "20px",
  cursor: "pointer",
}));

const Worlds = () => {
  const navigate = useNavigate();
  const [listWorlds, setListWorlds] = useState<any[]>([]);
  const [renderWorlds, setRenderWorlds] = useState<any[]>([]);
  const [showPrevious, setShowPrevious] = useState<boolean>(false);
  const [showNext, setShowNext] = useState<boolean>(true);
  //! Paginación
  const perPage = 3;
  const [lengthWorlds, setLengthWordls] = useState(0);
  const [index, setIndex] = useState(0);
  const [limit, setLimit] = useState(3);
  let siguiente = 0;

  useEffect(() => {
    axios
      .get(
        "https://trivias-api.azurewebsites.net/api/Mundos/ObtenerMundosDisponibles",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log("Mundos", response.data);
        setListWorlds(response.data);
        setRenderWorlds(response.data.slice(index, perPage));
        setLengthWordls(response.data.length);
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          navigate("/crear_perfil");
        }
      });
  }, []);

  useEffect(() => {
    console.log(`Index => ${index} ${limit}`);
    if (index + perPage >= listWorlds.length && listWorlds.length !== 0) {
      console.log("Limite");
      if (listWorlds.length % 2 === 1) {
        setRenderWorlds(
          listWorlds.slice(listWorlds.length - 2, listWorlds.length - 1)
        );
      } else {
        setRenderWorlds(
          listWorlds.slice(listWorlds.length - 3, listWorlds.length - 1)
        );
      }
      setShowNext(false);
    } else {
      if (index === 0) {
        setRenderWorlds(listWorlds.slice(0, perPage));
        setShowPrevious(false);
      } else {
        setRenderWorlds(listWorlds.slice(index, limit));
      }
    }
  }, [index]);

  const handleClick = (idWorld: string) => {
    navigate(`${idWorld}/trivias`);
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
    <Container backgroundUrl={imgBackground}>
      <Navbar />
      <Body>
        <Grid
          container
          justifyContent={"center"}
          sx={{
            flex: "1 0 auto",
            height: "80vh",
          }}
        >
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {(() => {
              if (showPrevious) {
                return (
                  <BoxArrow
                    backgroundUrl={flechaAtras}
                    onClick={handlePreviousPage}
                  ></BoxArrow>
                );
              }
            })()} */}
          </Grid>
          <Grid item xs={8}>
            <Box
              className={"flex"}
              sx={{
                justifyContent: "center",
                paddingTop: "10vh",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              {(() => {
                let result = [];
                for (let i = 0; i < renderWorlds.length; i++) {
                  if (i % 2 === 0) {
                    if (renderWorlds[i].bloqueado) {
                      result.push(
                        <Box>
                          <WorldComponent
                            key={renderWorlds[i].id}
                            id={renderWorlds[i].id}
                            title={renderWorlds[i].nombre}
                            img={renderWorlds[i].urlImgBlock}
                            handleClick={handleClick}
                            lock={renderWorlds[i].bloqueado}
                            triviasTotal={renderWorlds[i].triviasTotales}
                            triviasApproved={renderWorlds[i].triviasCompletadas}
                          />
                        </Box>
                      );
                    } else {
                      result.push(
                        <Box>
                          <WorldComponent
                            key={renderWorlds[i].id}
                            id={renderWorlds[i].id}
                            title={renderWorlds[i].nombre}
                            img={renderWorlds[i].urlImg600}
                            handleClick={handleClick}
                            lock={renderWorlds[i].bloqueado}
                            triviasTotal={renderWorlds[i].triviasTotales}
                            triviasApproved={renderWorlds[i].triviasCompletadas}
                          />
                        </Box>
                      );
                    }
                  } else {
                    if (renderWorlds[i].bloqueado) {
                      result.push(
                        <Box sx={{ marginTop: "100px" }}>
                          <WorldComponent
                            key={renderWorlds[i].id}
                            id={renderWorlds[i].id}
                            title={renderWorlds[i].nombre}
                            img={renderWorlds[i].urlImgBlock}
                            handleClick={handleClick}
                            lock={renderWorlds[i].bloqueado}
                            triviasTotal={renderWorlds[i].triviasTotales}
                            triviasApproved={renderWorlds[i].triviasCompletadas}
                          />
                        </Box>
                      );
                    } else {
                      result.push(
                        <Box sx={{ marginTop: "100px" }}>
                          <WorldComponent
                            key={renderWorlds[i].id}
                            id={renderWorlds[i].id}
                            title={renderWorlds[i].nombre}
                            img={renderWorlds[i].urlImg600}
                            handleClick={handleClick}
                            lock={renderWorlds[i].bloqueado}
                            triviasTotal={renderWorlds[i].triviasTotales}
                            triviasApproved={renderWorlds[i].triviasCompletadas}
                          />
                        </Box>
                      );
                    }
                  }
                }
                return result;
              })()}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {(() => {
              if (showNext && lengthWorlds > 0) {
                return (
                  <BoxArrow
                    backgroundUrl={flechaAdelante}
                    onClick={handleNextPage}
                  ></BoxArrow>
                );
              }
            })()} */}
          </Grid>
        </Grid>
      </Body>
    </Container>
  );
};

export default Worlds;
