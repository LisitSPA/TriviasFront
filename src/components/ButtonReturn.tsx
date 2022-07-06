import React from 'react';
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Box, Button} from "@mui/material";
//* Images
import flechaAtras from "../images/icons/flecha_atras.png";

type ReturnSection = {
  path: string
}

const ButtonReturn = ({path}: ReturnSection) => {
  const navigate = useNavigate();
  const [translate] = useTranslation("footer");

  const handleSubmit = () => {
    navigate(`/${path}`);
  }
  return (
    <Box sx={{
      padding:"30px",
      display: "flex",
      justifyContent: "space-between",
      boxSizing: "border-box"
    }}>
      <Box className={"flex center"}>
        <Button className={"btn-green-light"} onClick={handleSubmit}><span
          className={"config-img contain"}
          style={{backgroundImage: `url(${flechaAtras})`, width: "15px", height: "15px", marginRight: "10px"}}></span>
          {translate("return")} </Button>
      </Box>
    </Box>
  );
};

export default ButtonReturn;