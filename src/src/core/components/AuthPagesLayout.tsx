import React, { FunctionComponent } from "react";
import { Container } from "@mui/material";

const AuthPagesLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="App" style={{ backgroundColor: "#f5f9ea", minHeight: "100vh" }}>
      <Container maxWidth={"lg"}>{children}</Container>
    </div>
  );
};
export default AuthPagesLayout;
