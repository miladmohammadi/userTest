import { useState } from "react";

interface IUseGetUsersInitials {
  perPage: number;
  serviceAgent: Function;
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

interface IUserDataAndHandles<U> {
  data: IDataWithMeta<U> | undefined;
  loaded: boolean;
  loading: boolean;
  setFilter: (filters: IFilters) => void;
  setPage: (page: number) => void;
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
  (props: IUseGetUsersInitials): IUserDataAndHandles<IUser>;
}

export const useGetUsers: IUserGetUsers = ({ perPage, serviceAgent, initialFilters, initialPage }) => {
  const [data, setData] = useState<IDataWithMeta<IUser> | undefined>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setFilter = () => {};
  const setPage = () => {};

  return {
    data,
    loaded,
    loading,
    setFilter,
    setPage,
  };
};
