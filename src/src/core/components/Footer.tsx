import React, { FunctionComponent } from "react";
import { Box, Container, Toolbar, Typography } from "@mui/material";
import { Breakpoint } from "@mui/system";

const Footer: FunctionComponent<{ maxWidth?: Breakpoint | false }> = ({ maxWidth = "lg" }) => {
  return (
    <Toolbar sx={{ backgroundColor: "#f0f3e8", py: 5 }}>
      <Container maxWidth={maxWidth}>
        <Typography component={Box} variant={"caption"} sx={{ width: "100%", textAlign: "center" }}>
          Made With Love, Powered by React
        </Typography>
      </Container>
    </Toolbar>
  );
};
export default Footer;
