import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  LinearProgress,
  styled,
  linearProgressClasses,
  Modal,
} from "@mui/material";
//* Components
import Navbar from "../../components/Navbar";
//* Images
import imgBackground from "../../images/backgrounds/fondo_lobby.png";
import baseModal from "../../images/questions/base_modal.png";
import icoRestart from "../../images/questions/ico_repetir.png";
import icoNext from "../../images/questions/ico_continuar.png";
import logoCmpc from "../../images/logos/logo_cmpc.svg";
//* Styles
import Container from "../../styles/Container";
import Body from "../../styles/Body";
import ButtonReturn from "../../components/ButtonReturn";
import QuestionsComponent from "./components/QuestionsComponent";
import axios from "axios";

const styleModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "500px",
  backgroundImage: `url(${baseModal})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  border: "none",
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#1D1D1D",
    border: "6px solid #363636",
    borderRadius: 10,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#9ABD11",
  },
}));

const Questions = () => {
  const [progress, setProgress] = useState(0);
  // const countProgress = 100 / questions.length;
  const [countProgress, setCountProgress] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  let approve = false;
  const [textResult, setTextResult] = useState("");
  const [pointPerQuestion, setPointPerQuestion] = useState(200); // ! Arreglar esto
  const [pointsResult, setPointsResult] = useState(0);
  const [counter, setCounter] = useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const { idMundos, idTrivias } = useParams();
  const navigate = useNavigate();
  const [listQuestions, setListQuestions] = useState<any[]>([]);
  let user: any;
  const [idMundo, setIdMundo] = useState(0);
  const [pointsUser, setPointsUser] = useState(0);

  useEffect(() => {
    let user = getDataUser();
    axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Usuarios/ObtenerPuntaje",
        {
          idUsuario: user.IdUser,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response: any) => {
        setPointsUser(response.data);
      })
      .catch((error: any) => {
        console.log("Error => ", error);

        if (error.response.code === 401) {
          navigate("crear_perfil");
        }
      });
  }, []);

  useEffect(() => {
    const getData1 = async () => {
      await axios
        .get(
          `https://trivias-api.azurewebsites.net/api/Trivias/ObtenerTriviaPorId/${idTrivias}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response: any) => {
          console.log(response.data);

          setTotalPoints(response.data.puntajeMaximo);
          setIdMundo(response.data.mundoId);
        })
        .catch((error: any) => {
          if (error.response.status === 401) {
            navigate("/crear_perfil");
          }
        });
    };
    const getData2 = async () => {
      await axios
        .get(
          `https://trivias-api.azurewebsites.net/api/Trivias/ObtenerPreguntas/${idTrivias}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((response: any) => {
          setListQuestions(response.data);
          setCountProgress(100 / response.data.length);
        })
        .catch((error: any) => {
          if (error.response.status === 401) {
            navigate("/crear_perfil");
          }
        });
    };

    getData1();
    getData2();
  }, []);

  const handleClickAlternative = (isCorrect: boolean) => {
    user = getDataUser();

    if (listQuestions.length - 1 > counter) {
      setCounter(counter + 1);
      setProgress(progress + countProgress);
      calculatePoints(isCorrect);
    } else {
      if (listQuestions.length - 1 === counter) {
        setOpenModal(true);
        setProgress(progress + countProgress);
        calculatePoints(isCorrect);

        if (!approve) {
          setTextResult("Vuelve a intentarlo");
          axios.post(
            "https://trivias-api.azurewebsites.net/api/Trivias/RegistrarProgreso",
            {
              usuarioId: user.IdUser,
              triviaId: idTrivias,
              mundoId: idMundo,
              aprobado: false,
              puntajeObtenido: pointsResult,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
        } else {
          setTextResult("¡Felicidades!, puedes continuar");
          console.log(
            `Data Usuario => ${user.IdUser} - ${idTrivias} - ${idMundo} - ${totalPoints}`
          );
          axios
            .post(
              "https://trivias-api.azurewebsites.net/api/Trivias/RegistrarProgreso",
              {
                usuarioId: String(user.IdUser),
                triviaId: idTrivias,
                mundoId: idMundo,
                aprobado: true,
                puntajeObtenido: totalPoints,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken"
                  )}`,
                },
              }
            )
            .then((response: any) => {
              console.log("Success! => ", response.data);
            })
            .catch((error: any) => {
              console.log("Error => ", error);
              if (error.response.status === 401) {
                navigate("/crear_perfil");
              }
            });
        }
      }
    }
  };

  const calculatePoints = (response: boolean) => {
    if (response) {
      setPointsResult(pointsResult + pointPerQuestion);
      if (((pointsResult + pointPerQuestion) * 100) / totalPoints === 100) {
        approve = true;
      }
    }
  };

  const getDataUser = (): any => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }
    return "";
  };

  const restartTrivia = () => {
    setProgress(0);
    setCounter(0);
    setOpenModal(false);
    setPointsResult(0);
    approve = false;
    if (!approve) {
      setTotalPoints(800);
    }
  };

  return (
    <Container backgroundUrl={imgBackground}>
      <Navbar />
      <Body>
        <Grid container sx={{ marginTop: "5vh" }}>
          <Grid
            item
            xs={12}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant={"h3"}
              color={"white"}
              style={{ textAlign: "center" }}
            >
              Trivias N°1
            </Typography>
            <Typography
              variant={"h3"}
              color={"white"}
              style={{ textAlign: "center" }}
            >
              Conociendo Ciberseguridad 1
            </Typography>
          </Grid>

          {listQuestions.length > 0 && (
            <>
              <Grid
                item
                xs={6}
                sx={{
                  paddingTop: "10vh",
                  paddingLeft: "10%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    paddingLeft: "15%",
                    paddingBottom: "20%",
                    margin: 0,
                  }}
                >
                  <Typography
                    variant={"body1"}
                    align={"center"}
                    style={{ color: "white", fontSize: "25px" }}
                  >
                    {listQuestions[counter].descripcion}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  paddingTop: "10vh",
                  paddingLeft: "10%",
                  alignItems: "center",
                }}
              >
                {(() => {
                  let listRender: any[] = [];
                  for (
                    let index = 0;
                    index < listQuestions[counter].alternativas.length;
                    index++
                  ) {
                    let alternativeText = "";
                    switch (index) {
                      case 0:
                        alternativeText = "A";
                        break;
                      case 1:
                        alternativeText = "B";
                        break;
                      case 2:
                        alternativeText = "C";
                        break;
                      case 3:
                        alternativeText = "D";
                        break;

                      default:
                        break;
                    }

                    listRender.push(
                      <QuestionsComponent
                        key={listQuestions[counter].alternativas[index].id}
                        nomTrivia={
                          listQuestions[counter].alternativas[index].descripcion
                        }
                        action={handleClickAlternative}
                        opcion={alternativeText}
                        isCorrect={
                          listQuestions[counter].alternativas[index].esCorrecta
                        }
                      />
                    );
                  }
                  return <>{listRender}</>;
                })()}
              </Grid>
            </>
          )}

          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "200px",
                backgroundColor: "white",
                padding: "10px 0",
                marginBottom: "30px",
                borderRadius: "10px",
              }}
            >
              <Typography
                variant={"h6"}
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                CyberPoints: {pointsUser}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "200px",
                backgroundColor: "white",
                padding: "10px 0",
                marginBottom: "30px",
                borderRadius: "10px",
              }}
            >
              <Typography
                variant={"h5"}
                style={{ fontWeight: "bold", textAlign: "center" }}
              >
                CyberCoins: 0
              </Typography>
            </Box>

            <ButtonReturn path={"trivias"} />
          </Grid>

          <Grid
            item
            xs={7}
            sx={{
              display: "flex",
              //flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "60%" }}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
          </Grid>
        </Grid>
        <Modal
          disableEscapeKeyDown={true}
          disablePortal={true}
          disableAutoFocus={true}
          disableEnforceFocus={true}
          open={openModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            border: "none",
          }}
        >
          <Box sx={styleModal}>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                top: "210px",
                width: "100%",
              }}
            >
              <Typography
                variant={"h4"}
                color={"#FFFFFF"}
                style={{ textAlign: "center", marginRight: "50px" }}
              >
                {pointsResult}/{totalPoints}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "260px",
                bottom: 0,
                width: "100%",
              }}
            >
              <Typography
                variant={"h6"}
                color={"#FFFFFF"}
                style={{ textAlign: "center", marginRight: "50px" }}
              >
                {textResult}
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                top: "330px",
                width: "100%",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "center", width: "90%" }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    backgroundImage: `url(${icoRestart})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100px",
                    height: "70px",
                    m: 1,
                  }}
                  onClick={restartTrivia}
                ></Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    backgroundImage: `url(${icoNext})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100px",
                    height: "70px",
                    m: 1,
                  }}
                  onClick={() => navigate(`/mundos/${idMundos}/trivias`)}
                ></Box>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}>
          <Box
            sx={{
              backgroundImage: `url(${logoCmpc})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: "10vw",
              height: "10vh",
              float: "right",
            }}
          ></Box>
        </Box>
      </Body>
    </Container>
  );
};

export default Questions;
