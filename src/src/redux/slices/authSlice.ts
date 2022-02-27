import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk } from "../index";
import { RootState } from "../rootReducer";
import { IUser } from "../../core/hooks/useGetUsers";
import { db } from "../../db";
import { toast } from "react-toastify";

export interface AuthError {
  message: string;
}

export interface AuthState {
  isAuth: boolean;
  currentUser?: CurrentUser | null;
  error: AuthError;
}

export interface CurrentUser {
  token: string | null;
  user: IUser | null;
}

export const initialState: AuthState = {
  isAuth: !!localStorage.getItem("userauth"),
  error: { message: "" },
  currentUser: !!localStorage.getItem("user")
    ? { token: localStorage.getItem("userauth"), user: JSON.parse(localStorage.getItem("user") ?? "") }
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSuccess: (state, { payload }: PayloadAction<any>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setLogOut: (state) => {
      state.isAuth = false;
      state.currentUser = undefined;
    },
    setAuthFailed: (state, { payload }: PayloadAction<any>) => {
      state.error = payload;
      state.isAuth = false;
    },
    setAvatar: (state, { payload }: PayloadAction<any>) => {
      if (state.currentUser?.user) {
        state.currentUser.user.avatar = payload;
        localStorage.setItem("user", JSON.stringify(state.currentUser.user));
      }
    },
  },
});

export const login =
  (requestBody: any, history: any): AppThunk =>
  async (dispatch) => {
    console.log(requestBody, history);
    db.login(requestBody).then((x: { success: any; data: any }) => {
      console.log(x);
      if (x) {
        console.log(x?.success, x?.data);
        if (x.data.statusCode && x.data.statusCode === 404) {
          toast.error("Login Failed!");
          dispatch(setAuthFailed(x.data.memessage));
          return;
        }
        if (x.data.token) {
          localStorage.setItem("userauth", x.data.token);
          localStorage.setItem("user", JSON.stringify(x.data.user));
          dispatch(setAuthSuccess(x.data));
          history("/dashboard");
          return;
        }
        dispatch(setAuthFailed("something went wrong"));
        toast.error("Login Failed!");
      }
    });
  };

export const logOut =
  (history: any): AppThunk =>
  async (dispatch) => {
    localStorage.removeItem("userauth");
    localStorage.removeItem("user");
    dispatch(setLogOut());
    history("/login");
  };

export const { setAuthSuccess, setLogOut, setAuthFailed, setAvatar } = authSlice.actions;
export const authSelector = (state: RootState) => state.authSlice;
export default authSlice.reducer;
