import { db } from "../../db";
import { IUser } from "./useGetUsers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAddUser {}

interface IDeleteUser {}

interface IUpdateUser {}

interface IUserActions {
  (serviceAgent?: any): any;
}

export interface IUserLoginData {
  email: string;
  password: string;
  id?: string;
  name?: string;
  bio?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  avatar?: string;
}

export type IUserFormData = IUserLoginData & { role: IRole };

export type IRole = "ADMIN" | "STAFF" | "MEMBER";

export const roles = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  MEMBER: "MEMBER",
};

export const useUser: IUserActions = (serviceAgent = db) => {
  const navigate = useNavigate();
  const add = (userFormData: IUserFormData) => {
    serviceAgent.addUser({ ...userFormData, role: roles.MEMBER }).then((response: any) => {
      console.log(response);
      if (response.success) {
        toast.success("You Signed up successfully");
        navigate("/login");
      } else {
        toast.error(response.data);
      }
    });
  };

  const login = (userLoginData: IUserLoginData) => {
    serviceAgent.login(userLoginData).then((response: any) => {
      if (response.success) {
        //setLoginState(response.data);
      }
    });
  };

  const update = (userUpdate: IUser) => {
    serviceAgent.updateUser(userUpdate);
  };
  const deleteUser = (userEmail: string) => {};
  return {
    add,
    deleteUser,
  };
};
