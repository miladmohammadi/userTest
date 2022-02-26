import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";

interface IAddUser {}

interface IDeleteUser {}

interface IUpdateUser {}

interface IUserActions {
  (serviceAgent?: any): any;
}

export interface IUserFormData {
  email: string;
  password: string;
  role: IRole;
}

export type IRole = "ADMIN" | "STAFF" | "MEMBER";

const roles = {
  ADMIN: "ADMIN",
  STAFF: "STAFF",
  MEMBER: "MEMBER",
};

export const userUser: IUserActions = (serviceAgent) => {
  const add = (userFormData: IUserFormData) => {
    serviceAgent.addUser({ ...userFormData, role: roles.MEMBER });
  };

  return {
    add,
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
