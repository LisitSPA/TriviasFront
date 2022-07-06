import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useForm} from "react-hook-form";
import GoogleLogin from "react-google-login";
import {gapi} from "gapi-script";
import axios, {AxiosError} from "axios";
import {Alert, Box, Button, IconButton, Typography} from "@mui/material";
//* Images
import backgroundImg from "../../images/backgrounds/fondo_lobby.png";
import imgLogoTrivias from "../../images/logos/logoTrivia.png";
import imgFotoPerfil from "../../images/logos/foto_perfil.png";
import imgFotoPerfilHover from "../../images/logos/hover_foto_perfil.png";
//* Styles
import Container from "../../styles/Container";
import GoogleIcon from "@mui/icons-material/Google";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [translate] = useTranslation("create_profile");
  const [hiddenAlert, setHiddenAlert] = useState("none");
  const [textAlert, setTextAlert] = useState("");
  //* Atributos formulario de registro
  const [filePreview, setFilePreview] = useState(imgFotoPerfil);
  const [fileChange, setFileChange] = useState<any>(imgFotoPerfil);
  const [displayRegister, setDisplayRegister] = useState(false);
  const {register, setValue, handleSubmit, getValues} = useForm();
  const [displayButton, setDisplayButton] = useState(true);
  const [nameUser, setNameUser] = useState("");

  const onChangeNameUser = (e: any) => {
    setNameUser(e.target.value);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "77647987925-c99vslf2bu2ikdb3d9r79fhev7ba6p3b.apps.googleusercontent.com",
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSubmit = async (e: any) => {
    navigate("/inicio");
  };

  const handleChangeImage = (e: any) => {
    console.log("Change Images", e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
    setFileChange(e.target.files[0]);
  };

  const responseGoogle = (response: any) => {
    const emailGoogle = response.profileObj.email;
    const isEmailApproved = (): boolean => {
      const email = emailGoogle.split("@");
      return email[1] === "lisit.cl";
    };

    if (isEmailApproved()) {
      generateLogin(emailGoogle);
    } else {
      generateLogout();
    }
  };

  const generateLogin = (emailGoogle: string) => {
    axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Usuarios/Login",
        {
          data: emailGoogle,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log("Respuesta", response);
        localStorage.setItem("accessToken", response.data.token);
        if (
          response.data.displayName !== "" &&
          response.data.negocio !== "" &&
          response.data.subNegocio !== "" &&
          response.data.urlImagenPerfil !== "-"
        ) {
          navigate("/inicio");
        } else {
          setDisplayRegister(true);
          setValue("archivoImagen", response.data.urlImagenPerfil);
          setValue("nickname", response.data.displayName);
          setValue("negocio", response.data.negocio);
          setValue("subnegocio", response.data.subNegocio);
          setDisplayButton(false);
        }
      });
  };

  const generateLogout = () => {
    setHiddenAlert("block");
    setTextAlert("El correo ingresado no esta registrado y/o no pertenece a una cuenta CMPC")
  };

  const handleContinue = async () => {
    console.log("Continue data file => ", fileChange)
    let formData = new FormData();
    let blob = new Blob([fileChange], {type: "image/png"});
    console.log("Blob", blob)
    formData.append("archivoImagen", blob, String(String(fileChange.name).split(".")[0]).replace(" ", ""));
    formData.append("extension", "jpg");
    let user = parseJwt();
    user.nickName = localStorage.getItem("nickname");
    await axios
      .post(
        "https://trivias-api.azurewebsites.net/api/Miscelaneos/GuardarImagen",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response: any) => {
        console.log("Respuesta OK =>", response);
        user.urlImagenPerfil = response.data;
      })
      .catch((response: any) => {
        console.log("Respuesta ERROR =>", response);
      });

    console.log("Data usuario", user);

    await axios
      .put(
        "https://trivias-api.azurewebsites.net/api/Usuarios/ActualizarInfoUsuario",
        {
          idioma: String(user.Idioma),
          correo: String(user.Email),
          urlImagenPerfil: blob.size === 33 ? "https://imgtrivias.blob.core.windows.net/imagenes/blob.jpg" : String(user.urlImagenPerfil),
          nickName: nameUser,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response: any) => {
        console.log("Respuesta", response.data);

        navigate("/inicio");
      })
      .catch((error: AxiosError) => {
        console.log("Error", error)
        if (error.response?.status === 400) {
          setHiddenAlert("block");
          setTextAlert("El alias ingresado no es admitido")
        }
      });
  };

  const parseJwt = (): any => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }
    return "";
  };

  return (
    <Container backgroundUrl={backgroundImg}>
      <Box
        className={"config-img contain"}
        sx={{
          backgroundImage: `url(${imgLogoTrivias})`,
          width: "20%",
          height: "12vh",
          position: "relative",
        }}
      ></Box>
      <Box
        className={"flex center column"}
        sx={{
          width: "100%",
          marginTop: "5vh",
        }}
      >
        {!displayRegister && (
          <Typography
            variant={"h4"}
            color={"white"}
            style={{fontWeight: "bold", margin: "5vh 0"}}
          >
            {translate("login")}
          </Typography>
        )}
        {displayRegister && (
          <form
            encType="multipart/form-data"
            className={"flex center column"}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant={"h4"}
              color={"white"}
              style={{fontWeight: "bold", margin: "5vh 0"}}
            >
              {translate("title")}
            </Typography>
            <Box
              className={"config-img"}
              sx={{
                backgroundImage: `url(${filePreview})`,
                width: "200px",
                height: "200px",
                transition: "all .3s",
                cursor: "pointer",
                borderRadius: "50%",
                "&:hover": {
                  backgroundImage: `url(${imgFotoPerfilHover})`,
                },
              }}
            >
              <input
                type="file"
                accept="image/jpg"
                {...register("archivoImagen")}
                onChange={handleChangeImage}
                style={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  opacity: "0",
                }}
              />
            </Box>
            <input
              type="text"
              className={"input-form"}
              placeholder={translate("inputName")}
              defaultValue={""}
              onChange={onChangeNameUser}
            />
            <input
              type="text"
              className={"input-form-lock"}
              placeholder={translate("inputNegocio")}
              defaultValue={""}
              {...register("negocio")}
              readOnly={true}
            />
            <input
              type="text"
              className={"input-form-lock"}
              placeholder={translate("inputSubnegocio")}
              defaultValue={""}
              {...register("subnegocio")}
              readOnly={true}
            />
            <input
              type="submit"
              className={"btn-green-light"}
              style={{
                marginTop: "10px",
                display: displayButton ? "block" : "none",
              }}
              value={translate("button")}
            />
          </form>
        )}
        <GoogleLogin
          clientId="77647987925-c99vslf2bu2ikdb3d9r79fhev7ba6p3b.apps.googleusercontent.com"
          render={(renderProps) => {
            return (
              <Button
                startIcon={<GoogleIcon/>}
                className={"btn-green-light"}
                onClick={renderProps.onClick}
                style={{
                  marginTop: "10px",
                  display: displayButton ? "flex" : "none",
                }}
              >
                {translate("signIn")}
              </Button>
            );
          }}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <Button
          className={"btn-green-light"}
          style={{
            marginTop: "10px",
            display: displayButton ? "none" : "block",
          }}
          onClick={handleContinue}
        >
          Continuar
        </Button>
        <Box sx={{display: hiddenAlert}}>
          <Alert severity="error" style={{marginTop: "10px"}}>
            {textAlert}
          </Alert>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProfile;
