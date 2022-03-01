import { FunctionComponent, useEffect } from "react";
import { useCurrentUser } from "../hooks/reduxHooks";
import { useNavigate } from "react-router";
import * as React from "react";

const PrivateRoute: FunctionComponent = ({ children }) => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.isAuth) {
      navigate("/login");
    }
  });
  if (!user?.isAuth) {
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
