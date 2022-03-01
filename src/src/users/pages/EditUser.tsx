import * as React from "react";
import { FunctionComponent } from "react";
import useMyProfile from "../hooks/useMyProfile";
import PublicLayout from "../../core/components/PublicLayout";
import { Container } from "@mui/material";
import ModeToggle from "../components/ModeToggle";
import ProfileFields from "../components/ProfileFields";

const EditUser: FunctionComponent = () => {
  const { profileData } = useMyProfile("other");

  return (
    <PublicLayout maxWidth={"lg"}>
      <Container maxWidth={"lg"}>
        <ModeToggle mode={"edit"} id={profileData?.id} />
        <ProfileFields variant={"other"} mode={"edit"} profileData={profileData} />
      </Container>
    </PublicLayout>
  );
};
export default EditUser;
