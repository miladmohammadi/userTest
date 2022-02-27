import { RouteObject, useNavigate, useRoutes } from "react-router";
import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import Login from "../auth/components/login";
import SignUp from "../auth/components/SignUp";
import Profile from "../users/components/Profile";
import { useCurrentUser } from "../core/hooks/reduxHooks";
import AuthPagesLayout from "../core/components/AuthPagesLayout";
import UserList from "../users/components/UserList";

interface IErrorPage {
  type: number;
}

interface IRoutesComponent {
  routes: RouteObject[];
}

const ErrorsPage: FunctionComponent<IErrorPage> = ({ type }) => {
  return <AuthPagesLayout>{type}: Happened</AuthPagesLayout>;
};

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
const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/user/profile");
  });
  return <></>;
};

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
    path: "users/:id",
    key: "USERS",
    element: (
      <PrivateRoute>
        <Profile variant={"other"} />
      </PrivateRoute>
    ),
    exact: true,
  },
  {
    path: "user/profile",
    key: "PROFILE",
    element: (
      <PrivateRoute>
        <Profile variant={"self"} />
      </PrivateRoute>
    ),
    exact: true,
  },
  {
    path: "user/add",
    key: "USERADD",
    element: (
      <PrivateRoute>
        <Profile variant={"self"} />
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
