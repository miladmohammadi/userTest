import React from "react";
import "./App.css";
import ROUTES, { RenderRoutes } from "./src/routes/Routes";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <RenderRoutes routes={ROUTES} />
    </HashRouter>
  );
}

export default App;
