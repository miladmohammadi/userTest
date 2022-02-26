import Dexie, { Table } from "dexie";
import { IRole, IUserFormData } from "./core/hooks/useUser";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id?: string;
  email: string;
  role: IRole;
  password: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  users!: Table<User>;

  constructor() {
    super("userManagement");
    this.version(5).stores({
      users: "++email,id,password, name, role, bio, facebook,instagram,linkedin,twitter", // Primary key and indexed props
    });
  }

  addUser(user: IUserFormData) {
    this.users
      .add({ ...user, id: uuidv4() })
      .then(() => {
        return Promise.resolve({
          success: true,
          data: "User Added Successfully",
        });
      })
      .catch((error) => {
        if ((error.name = "ConstraintError")) {
          return Promise.resolve({
            success: false,
            data: "This Email Address Already Exists Try Another One",
          });
        } else {
          return Promise.resolve({
            success: true,
            data: "An Unexpected Error Happened",
          });
        }
      });
  }
}

export const db = new MySubClassedDexie();
