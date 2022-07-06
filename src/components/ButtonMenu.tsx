import React from 'react';
import {Box, Typography} from "@mui/material";
import { NavLink} from "react-router-dom";

interface PropsMenu {
  title: string;
  url: string;
  path: string;
}

const ButtonMenu = (props: PropsMenu) => {


  return (
    <NavLink className={({isActive}) => (isActive? "active": "")} style={{
      textDecoration: "none",
    }} to={props.path}>
      <Box className={"flex center column"} sx={{
        width: "130px",
        height: "100%",
      }}>
        <Box className={"config-img contain"} sx={{
          backgroundImage: `url(${props.url})`,
          width: "100%",
          height: "50%",
          cursor: "pointer"
        }}></Box>
        <Typography variant={"body1"} color={"white"}>{props.title}</Typography>
      </Box>
    </NavLink>
  );
};

export default ButtonMenu;