import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router";
import * as React from "react";

const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/profile");
  });
  return <></>;
};
export default Dashboard;
