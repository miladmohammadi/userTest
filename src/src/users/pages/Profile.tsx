import { FunctionComponent } from "react";
import useMyProfile from "../hooks/useMyProfile";
import PublicLayout from "../../core/components/PublicLayout";
import { Container } from "@mui/material";
import ModeToggle from "../components/ModeToggle";
import ProfileShow from "../components/ProfileShow";
import * as React from "react";

const Profile: FunctionComponent = () => {
  const { profileData } = useMyProfile("self");

  return (
    <PublicLayout maxWidth={"lg"}>
      <Container maxWidth={"lg"}>
        <ModeToggle mode={"show"} id={profileData?.id} />
        <ProfileShow profileData={profileData} />
      </Container>
    </PublicLayout>
  );
};
export default Profile;

export interface IProfile {
  variant: "self" | "other";
  mode: "add" | "edit" | "show";
}
