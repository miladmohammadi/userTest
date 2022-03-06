import { FunctionComponent } from "react";
import { IUser } from "../../core/hooks/useGetUsers";
import { useNavigate } from "react-router-dom";
import { db } from "../../db";
import { toast } from "react-toastify";
import { IRole, IUserFormData } from "../../core/hooks/useUser";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import * as React from "react";
import { IProfile } from "../pages/Profile";
import {
  emailValidator,
  passwordValidator,
  simpleRequiredValidator,
  composeNameValidator,
} from "../../core/hooks/FormControl/validationFunctions";
import useFormControl from "../../core/hooks/FormControl/useFormControl";

const ProfileFields: FunctionComponent<IProfile & { profileData?: IUser | null }> = ({
  variant,
  mode,
  profileData,
}) => {
  let fields = ["email", "name", "role", "bio", "facebook", "instagram", "linkedin", "twitter", "avatar"];
  if (mode === "add") {
    fields.push("password");
  }
  const navigate = useNavigate();
  const formik = useFormControl({
    initialValues: {
      email: "",
      name: "",
      role: "",
      bio: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      avatar: "",
      ...(mode === "add" && { password: "" }),
      ...(mode !== "add" && { ...profileData }),
    },
    validationSchema: {
      email: emailValidator,
      name: composeNameValidator("Name", simpleRequiredValidator),
      role: composeNameValidator("Role", simpleRequiredValidator),
      bio: composeNameValidator("Bio", simpleRequiredValidator),
      facebook: composeNameValidator("Facebook", simpleRequiredValidator),
      instagram: composeNameValidator("Instagram", simpleRequiredValidator),
      linkedin: composeNameValidator("Linkedin", simpleRequiredValidator),
      twitter: composeNameValidator("Twitter", simpleRequiredValidator),
      avatar: composeNameValidator("Avatar", simpleRequiredValidator),
      ...(mode === "add" && {
        password: passwordValidator,
      }),
    },
    onSubmit: (values) => {
      if (mode !== "add" && profileData) {
        db.updateUser({ ...values, id: profileData.id } as IUser).then((response) => {
          if (response.success) {
            toast.success(response.data);
            navigate("/user/" + profileData.id);
          } else {
            toast.error(response.data);
          }
        });
      } else if (mode === "add" && values.password) {
        db.addUser({ ...values, password: values.password, role: values.role as IRole } as IUserFormData).then(
          (response) => {
            if (response.success) {
              toast.success("Successfully added!");
              navigate("/user/" + response.data);
            } else {
              toast.error(response.data);
            }
          },
        );
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Avatar
            variant={"rounded"}
            sx={{
              width: "100%",
              height: "fit-content",
              my: 2,
              border: "1px solid #33333314",
              background: "#33333309",
            }}
            src={formik.values.avatar ?? profileData?.avatar}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {fields.map((field) => (
            <TextField
              key={field}
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id={field}
              label={field}
              name={field}
              autoComplete={field}
              autoFocus={(mode !== "add" && field === "name") || field === "email"}
              disabled={field === "email" && mode !== "add"}
              type={field === "password" ? "password" : "text"}
              value={formik.values[field as keyof typeof formik.values]}
              onChange={formik.handleChange}
              error={formik.touched[field as keyof typeof formik.touched]}
              helperText={
                formik.touched[field as keyof typeof formik.touched] &&
                formik.errors[field as keyof typeof formik.errors]
              }
            />
          ))}
          <Box sx={{ display: "flex", width: "100%", flexDirection: "row-reverse", py: 1 }}>
            <Button variant={"contained"} type={"submit"}>
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};
export default ProfileFields;
