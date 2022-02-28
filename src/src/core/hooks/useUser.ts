import { db } from "../../db";
import { IUser } from "./useGetUsers";

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

export const userUser: IUserActions = (serviceAgent = db) => {
  const add = (userFormData: IUserFormData) => {
    serviceAgent.addUser({ ...userFormData, role: roles.MEMBER });
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
  const DeleteUser = (userEmail: string) => {};
  return {
    add,
    login,
  };
};

const userAddUser: IAddUser = () => {};
const userDeleteUser: IDeleteUser = () => {};
const useUpdateUser: IUpdateUser = () => {};
