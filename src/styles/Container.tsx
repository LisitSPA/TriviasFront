import React from 'react';
import styled from "@emotion/styled";

type DivProps = {
  backgroundUrl: string;
};


const Container = styled("div")<DivProps>(({backgroundUrl}: DivProps ) => ({
  backgroundImage: `url(${backgroundUrl})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  minHeight: "100vh",
  height: "auto",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
}))

export default Container;