import React from "react";
import { Box, Typography } from "@mui/material";

const InputScore = ({ score }: any) => {
  return (
    <Box
      sx={{
        backgroundColor: "#8C8B8E",
        borderRadius: "20px",
        width: "20%",
        height: "30px",
      }}
    >
      <Typography
        variant={"h6"}
        color={"white"}
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        {score}
      </Typography>
    </Box>
  );
};

export default InputScore;
