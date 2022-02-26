import { RouteObject, useRoutes } from "react-router";
import * as React from "react";
import { FunctionComponent } from "react";
import Login from "../auth/components/login";
import SignUp from "../auth/components/SignUp";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import UserCard from "../users/components/UserCard";
import PublicLayout from "../core/components/PublicLayout";

interface IErrorPage {
  type: number;
}

interface IRoutesComponent {
  routes: RouteObject[];
}

const ErrorsPage: FunctionComponent<IErrorPage> = ({ type }) => {
  return <PublicLayout>{type}: Happened</PublicLayout>;
};

const UserProfile: FunctionComponent = () => {
  let params = useParams();
  return <PublicLayout>{params.id}</PublicLayout>;
};

const UserList: FunctionComponent = () => {
  return (
    <PublicLayout>
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <Grid item xs={3} lg={3} md={4} sm={12}>
            <UserCard />
          </Grid>
        ))}
      </Grid>
    </PublicLayout>
  );
};

// routes Manager
const ROUTES = [
  { path: "/", element: <Login /> },
  {
    path: "login",
    key: "LOGIN",
    exact: true,
    element: <Login />,
  },
  {
    path: "signup",
    key: "SIGNUP",
    exact: true,
    element: <SignUp />,
  },
  { path: "users", key: "USERS", element: <UserList />, exact: true },
  {
    path: "users/:id",
    key: "USERS",
    element: <UserProfile />,
    exact: true,
  },
  { path: "*", element: <ErrorsPage type={404} /> },
];

export default ROUTES;

export const RenderRoutes: FunctionComponent<IRoutesComponent> = ({ routes }) => {
  return useRoutes(routes);
};
