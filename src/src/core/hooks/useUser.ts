import { useLiveQuery } from "dexie-react-hooks";
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
}

export type IUserFormData = IUserLoginData & { role: IRole };

export type IRole = "ADMIN" | "STAFF" | "MEMBER";

const roles = {
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
// const users = useLiveQuery(
//     async () => {
//       //
//       // Query Dexie's API
//       //
//       const user = await db.users
//           .where("role")
//           .anyOf([...role])
//           .toArray();
//
//       // Return result
//       return users;
//     },
//     // specify vars that affect query:
//     [role, page],
// );