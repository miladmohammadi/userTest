import { db } from "../../db";
import { IUser } from "../../core/hooks/useGetUsers";

const useUpdateProfile = () => {
  const update = (values: IUser) => {
    db.updateUser(values);
  };
  return { update };
};
export default useUpdateProfile;
