import React from 'react';
import {Box} from "@mui/material";
import styled from "@emotion/styled";
//* Images
import flechaSig from "../images/icons/flecha_sig.png";
import flechaAtras from "../images/icons/flecha_atras.png";

type DivProps = {
  backgroundUrl: string;
  display: string;
}

interface PaginationProps {
  display1: string;
  display2: string;
  handleNextPage: () => void;
  handlePreviousPage: () => void;

}

const BoxArrow = styled("div")<DivProps>((props: DivProps) => ({
  display: props.display,
  backgroundImage: `url(${props.backgroundUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
  width: "100px",
  height: "100px",
  margin: "20px",
  cursor: "pointer"
}));

const PaginationComponent = ({display1, display2, handleNextPage, handlePreviousPage}: PaginationProps) => {
  return (
    <Box sx={{display: "flex"}}>
      <BoxArrow backgroundUrl={flechaAtras} display={display1} onClick={handlePreviousPage}></BoxArrow>
      <BoxArrow backgroundUrl={flechaSig} display={display2} onClick={handleNextPage}></BoxArrow>
    </Box>
  );
};

export default PaginationComponent;