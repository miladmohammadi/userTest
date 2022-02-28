import { FunctionComponent } from "react";
import PublicLayout from "../../core/components/PublicLayout";
import { Container } from "@mui/material";
import ProfileFields from "../components/ProfileFields";

const AddUser: FunctionComponent = () => {
  return (
    <PublicLayout maxWidth={"lg"}>
      <Container maxWidth={"lg"}>
        <ProfileFields variant={"other"} mode={"add"} />
      </Container>
    </PublicLayout>
  );
};
export default AddUser;
