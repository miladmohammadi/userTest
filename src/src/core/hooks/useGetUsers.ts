import { Dispatch, SetStateAction, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { IRole } from "./useUser";

interface IUseGetUsersInitials {
  perPage: number;
  initialFilters: any;
  initialPage: number;
}

interface IDataWithMeta<S> {
  list: S[];
  pagination: {
    Page: number;
    totalPage: number;
    perPage: number;
  };
}

interface IFilters {
  role?: string;
  name?: string;
  bio?: string;
}

interface IUserDataAndHandles {
  list: IUser[] | undefined;
  totalPage?: number;
  setSelectedRoles: Dispatch<SetStateAction<IRole[] | []>>;
  loaded: boolean;
  loading: boolean;
  setEmailSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface IUser {
  id?: string;
  email: string;
  password: string;
  name?: string;
  role?: string;
  bio?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  avatar?: string;
}

interface IUserGetUsers {
  (props: IUseGetUsersInitials): IUserDataAndHandles;
}

export const useGetUsers: IUserGetUsers = ({ perPage, initialFilters }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState<IRole[] | []>([]);
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const list = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const users = await db.users;
      const filterByEmailOrRole =
        emailSearch || selectedRoles.length > 0
          ? users.filter((user) => {
              if (emailSearch && selectedRoles.length > 0) {
                return (
                  user.email.startsWith(emailSearch) && selectedRoles.some((selectedRole) => selectedRole === user.role)
                );
              }
              if (selectedRoles.length > 0) {
                return selectedRoles.some((selectedRole) => selectedRole === user.role);
              }
              if (emailSearch) {
                return user.email.startsWith(emailSearch);
              }
              console.log("seem something not working!");
              return true;
            })
          : users;
      const total = await filterByEmailOrRole.toArray();
      const final = await filterByEmailOrRole
        .offset((page - 1) * perPage)
        .limit(perPage)
        .toArray();
      return { list: final, totalPage: Math.ceil(total.length / perPage) };
    },
    // specify vars that affect query:
    [selectedRoles, page, emailSearch],
  );

  return {
    list: list?.list,
    totalPage: list?.totalPage,
    loaded,
    loading,
    setSelectedRoles,
    setEmailSearch,
    setPage,
  };
};
