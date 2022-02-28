import { useEffect, useState } from "react";
import { db } from "../../db";
import { useCurrentUser } from "../../core/hooks/reduxHooks";
import { IUser } from "../../core/hooks/useGetUsers";
import { useParams } from "react-router-dom";

const useMyProfile = (variant: string) => {
  const [profileData, setProfileData] = useState<IUser | null>();
  const [success, setSuccess] = useState<boolean>(false);
  let params = useParams();
  const user = useCurrentUser();
  useEffect(() => {
    if (user.isAuth && user.currentUser && user.currentUser.token) {
      if (variant === "self") {
        db.getMyProfileData(user.currentUser.token).then((response: any) => {
          const { success, data } = response;
          if (success) {
            setProfileData(data);
          } else {
            setSuccess(false);
          }
        });
      } else if (variant === "other" && params.id) {
        db.getProfileData(user.currentUser.token, params.id).then((response: any) => {
          const { success, data } = response;
          if (success) {
            setProfileData(data);
          } else {
            setSuccess(false);
          }
        });
      }
    }
  }, [params.id]);
  return { success, profileData };
};
export default useMyProfile;
