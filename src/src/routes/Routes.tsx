import { RouteObject, useRoutes } from "react-router";
import * as React from "react";
import { FunctionComponent } from "react";
import Login from "../auth/components/login";
import SignUp from "../auth/components/SignUp";
import UserList from "../users/components/UserList";
import ShowUser from "../users/pages/ShowUser";
import AddUser from "../users/pages/AddUser";
import EditUser from "../users/pages/EditUser";
import Profile from "../users/pages/Profile";
import ErrorsPage from "../core/pages/ErrorPage";
import PrivateRoute from "../core/components/PrivateRoute";
import Dashboard from "../core/pages/Dashboard";

interface IRoutesComponent {
  routes: RouteObject[];
}

// routes Manager
const ROUTES = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
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
  {
    path: "users",
    key: "USERS",
    element: (
      <PrivateRoute>
        <UserList />
      </PrivateRoute>
    ),
    exact: true,
  },
  {
    path: "user/:id",
    key: "USERS",
    element: (
      <PrivateRoute>
        <ShowUser />
      </PrivateRoute>
    ),
    exact: true,
  },
  {
    path: "user/add",
    key: "USERADD",
    element: (
      <PrivateRoute>
        <AddUser />
      </PrivateRoute>
    ),
    exact: true,
  },
  {
    path: "user/edit/:id",
    key: "USEREDIT",
    element: (
      <PrivateRoute>
        <EditUser />
      </PrivateRoute>
    ),
    exact: true,
  },
  {
    path: "user/profile",
    key: "PROFILE",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
    exact: true,
  },
  { path: "*", element: <ErrorsPage type={404} /> },
];

export default ROUTES;

export const RenderRoutes: FunctionComponent<IRoutesComponent> = ({ routes }) => {
  return useRoutes(routes);
};
