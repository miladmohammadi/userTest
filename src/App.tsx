import React from "react";
import "./App.css";
import ROUTES, { RenderRoutes } from "./src/routes/Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RenderRoutes routes={ROUTES} />
    </BrowserRouter>
  );
}

export default App;
