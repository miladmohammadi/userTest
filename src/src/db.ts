import Dexie, { Table } from "dexie";
import { IRole, IUserFormData, IUserLoginData } from "./core/hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import { signToken, verifyToken } from "./jwt";
import { IUser } from "./core/hooks/useGetUsers";

export interface User {
  id?: string;
  email: string;
  role: IRole;
  password: string;
}

export class MySubClassedDexie extends Dexie {
  users!: Table<IUser>;

  constructor() {
    super("userManagement");
    this.version(5).stores({
      users: "++email,id,password, name, role, bio, facebook,instagram,linkedin,twitter", // Primary key and indexed props
    });
  }

  addUser(user: IUserFormData) {
    const id = uuidv4();
    return this.users
      .add({ ...user, id: id })
      .then(() => {
        return Promise.resolve({
          success: true,
          data: id,
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
            success: false,
            data: "An Unexpected Error Happened",
          });
        }
      });
  }

  updateUser(updatedUser: IUser) {
    return this.users
      .update(updatedUser.email, updatedUser)
      .then((updated) => {
        if (updated) {
          return Promise.resolve({
            success: true,
            data: `${updatedUser.email} successfully updated`,
          });
        } else {
          return Promise.resolve({
            success: false,
            data: `Nothing was updated - there were no user with this Email: ${updatedUser.email}`,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        return Promise.resolve({
          success: false,
          data: `Nothing was updated - there were no user with this Email: ${updatedUser.email}`,
        });
      });
  }

  login(user: IUserLoginData) {
    return this.users
      .get(user.email)
      .then((userData) => {
        if (!userData) {
          return Promise.resolve({
            success: false,
            data: "Login Failed!",
          });
        }
        if (userData.password === user.password) {
          return signToken({ email: userData.email, id: userData.id })
            .then((token) => {
              return Promise.resolve({
                success: true,
                data: {
                  token: token.string,
                  user: {
                    email: userData.email,
                    name: userData.name ?? "",
                    avatar: userData.avatar ?? "",
                  },
                },
              });
            })
            .catch((error) => {
              return Promise.resolve({
                success: false,
                data: "Login Failed!",
              });
            });
        } else {
          return Promise.resolve({
            success: false,
            data: "Login Failed!",
          });
        }
      })
      .catch(() => {
        return Promise.resolve({
          success: false,
          data: "Login Failed!",
        });
      });
  }

  getProfileData(jwtToken: string, userId: string) {
    return verifyToken(jwtToken)
      .then((value) => {
        return this.users
          .get({ id: userId })
          .then((user) => {
            if (user && user.hasOwnProperty("password")) {
              const { password, ...safe } = user;
              return Promise.resolve({
                success: true,
                data: safe,
              });
            }
          })
          .catch((e) => {
            return Promise.resolve({
              success: false,
              data: "401 UN-Authorized!",
            });
          });
      })
      .catch((e) => {
        return Promise.resolve({
          success: false,
          data: "401 UN-Authorized!",
        });
      });
  }

  getMyProfileData(jwtToken: string) {
    return verifyToken(jwtToken)
      .then((value) => {
        console.log(value.claims.id);
        return this.users
          .get({ id: value.claims.id })
          .then((user) => {
            if (user && user.hasOwnProperty("password")) {
              const { password, ...safe } = user;
              return Promise.resolve({
                success: true,
                data: safe,
              });
            }
          })
          .catch((e) => {
            return Promise.resolve({
              success: false,
              data: "401 UN-Authorized!",
            });
          });
      })
      .catch((e) => {
        return Promise.resolve({
          success: false,
          data: "401 UN-Authorized!",
        });
      });
  }

  deleteUser(email: string) {}
}

export const db = new MySubClassedDexie();
