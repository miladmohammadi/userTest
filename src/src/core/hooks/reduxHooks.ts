import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux";
import type { RootState } from "../../redux/rootReducer";
import { login, logOut } from "../../redux/slices/authSlice";
import { IUser } from "./useGetUsers";
import { useNavigate } from "react-router";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const loginUser = (userData: IUser) => dispatch(login(userData, history));
  return { loginUser };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const history = useNavigate();
  const logout = () => dispatch(logOut(history));
  return { logout };
};

export const useCurrentUser = () => {
  const authState = useAppSelector((state) => state.authSlice);
  return authState;
};
