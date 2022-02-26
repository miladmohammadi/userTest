interface IUseGetUsersInitials {
  perPage: number;
  serviceAgent: Function;
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
  data: IDataWithMeta;
  loaded: boolean;
  loading: boolean;
  filters: (filters: IFilters) => void;
  paginate: (page: number) => void;
}

interface IUserGetUsers {
  (props: IUseGetUsersInitials): IUserDataAndHandles;
}

const useGetUsers: IUserGetUsers = ({ perPage, serviceAgent }) => {
  return {
    data,
    loaded,
    loading,
    filter,
    paginate,
  };
};
