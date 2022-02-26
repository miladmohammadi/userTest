import React, { FunctionComponent } from "react";
import "./App.css";
import ROUTES, { RenderRoutes } from "./src/utils/Routes";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";

function App() {
  // const [state, setState] = useState("");
  // useEffect(() => {
  //   signToken({ userId: "100", userName: "milad" }).then((value) => {
  //     setState(value.string);
  //   });
  // }, []);
  //
  // useEffect(() => {
  //   if (state)
  //     verifyToken(state).then((value) => {
  //       console.log(value);
  //     });
  // }, [state]);

  return (
    <>
      <BrowserRouter>
        <RenderRoutes routes={ROUTES} />
      </BrowserRouter>
    </>
  );
}

export default App;
