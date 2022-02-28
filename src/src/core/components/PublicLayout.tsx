import React, { FunctionComponent } from "react";
import { Container } from "@mui/material";
import Menu from "./Menu";
import { Breakpoint } from "@mui/system";
import Footer from "./Footer";

const PublicLayout: FunctionComponent<{ maxWidth?: Breakpoint | false }> = ({ children, maxWidth }) => {
  return (
    <>
      <Menu maxWidth={maxWidth ?? "lg"}>
        <div className="App" style={{ backgroundColor: "#f5f9ea", minHeight: "100vh" }}>
          <Container maxWidth={maxWidth ?? "lg"}>{children}</Container>
        </div>
      </Menu>
      <Footer />
    </>
  );
};
export default PublicLayout;
