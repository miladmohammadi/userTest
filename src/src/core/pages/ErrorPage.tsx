import { FunctionComponent } from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import * as React from "react";

interface IErrorPage {
  type: number;
}

const ErrorsPage: FunctionComponent<IErrorPage> = ({ type }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ fontSize: "9rem" }}>{type}</Box>
        <Link to={"/"}>
          <Button>Take Me Home</Button>
        </Link>
      </Box>
    </Box>
  );
};
export default ErrorsPage;
