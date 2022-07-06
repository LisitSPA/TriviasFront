import React from "react";
import {Box, Typography} from "@mui/material";
import imgLogoTrivias from "../images/logos/logoTrivia.png";
import ButtonMenu from "../components/ButtonMenu";
import icoTrivia from "../images/icons/trivias.png";
import icoPremio from "../images/icons/premios.png";
import icoAprende from "../images/icons/aprende_mas.png";
import icoPerfil from "../images/icons/perfil.png";
import icoLogout from "../images/icons/cerrar_sesion.png";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const Navbar = () => {
  const navigate = useNavigate();
  const [translate] = useTranslation("navbar");

  const logout = () => {
    navigate("/");
  };

  const returnHome = () => {
    navigate("/inicio");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "12vh",
        display: "flex",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: "20px",
        cursor: "pointer",
      }}
    >
      <Box
        className={"config-img contain"}
        sx={{
          backgroundImage: `url(${imgLogoTrivias})`,
          width: "20%",
          height: "100%",
          position: "relative",
        }}
        onClick={returnHome}
      ></Box>
      <Box className={"flex"}>
        <ButtonMenu title={"Administrador"} url={icoTrivia} path={"/admin"}/>
        <ButtonMenu
          title={translate("trivias")}
          url={icoTrivia}
          path={"/mundos"}
        />
        <ButtonMenu
          title={translate("rewards")}
          url={icoPremio}
          path={"/premios"}
        />
        <a
          style={{
            textDecoration: "none",
          }}
          href="https://webciberseguridad.cl/"
          target="_blank"
          rel="noreferrer"
        >
          <Box
            className={"flex center column"}
            sx={{
              width: "130px",
              height: "100%",
            }}
          >
            <Box
              className={"config-img contain"}
              sx={{
                backgroundImage: `url(${icoAprende})`,
                width: "100%",
                height: "50%",
                cursor: "pointer",
              }}
            ></Box>
            <Typography variant={"body1"} color={"white"}>
              {translate("learn")}
            </Typography>
          </Box>
        </a>
        <ButtonMenu
          title={translate("rules")}
          url={icoPerfil}
          path={"/reglas"}
        />
        <ButtonMenu
          title={translate("profile")}
          url={icoPerfil}
          path={"/editar_perfil"}
        />
        <Box
          className={"flex center column"}
          sx={{
            width: "130px",
            height: "100%",
          }}
          onClick={logout}
        >
          <Box
            className={"config-img contain"}
            sx={{
              backgroundImage: `url(${icoLogout})`,
              width: "100%",
              height: "50%",
              cursor: "pointer",
            }}
          ></Box>
          <Typography variant={"body1"} color={"white"}>
            {translate("logOut")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
