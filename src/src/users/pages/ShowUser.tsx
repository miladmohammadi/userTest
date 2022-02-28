import * as React from "react";
import { FunctionComponent } from "react";
import useMyProfile from "../hooks/useMyProfile";
import PublicLayout from "../../core/components/PublicLayout";
import { Container } from "@mui/material";
import ProfileShow from "../components/ProfileShow";
import ModeToggle from "../components/ModeToggle";

const ShowUser: FunctionComponent = () => {
  const { profileData } = useMyProfile("other");

  return (
    <PublicLayout maxWidth={"lg"}>
      <Container maxWidth={"lg"}>
        <ModeToggle mode={"show"} id={profileData?.id} />
        <ProfileShow profileData={profileData} />
      </Container>
    </PublicLayout>
  );
};
export default ShowUser;
