import React from "react";
import { Box } from "@mui/material";
import { Audio } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0,0,0,.4)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Audio
        height="90"
        width="90"
        radius="9"
        color="#DA2128"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </Box>
  );
};

export default LoadingScreen;
