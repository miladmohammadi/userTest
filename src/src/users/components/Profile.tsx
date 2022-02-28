import * as React from "react";
import { FunctionComponent, useState } from "react";
import PublicLayout from "../../core/components/PublicLayout";
import { Avatar, Box, Button, ButtonGroup, Container, Grid, TextField } from "@mui/material";
import useMyProfile from "../hooks/useMyProfile";
import { useFormik } from "formik";
import * as yup from "yup";
import { db } from "../../db";
import { IRole } from "../../core/hooks/useUser";

export interface IProfile {
  variant: "self" | "other";
  mode: "add" | "edit" | "show";
}

const Profile: FunctionComponent<IProfile> = ({ variant, mode }) => {
  const [disabled, setDisabled] = useState<boolean>(mode !== "add");

  const { success, profileData } = useMyProfile(variant);

  let fields = ["email", "name", "role", "bio", "facebook", "instagram", "linkedin", "twitter", "avatar"];
  if (mode === "add") {
    fields.push("password");
  }
  const formik = useFormik({
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
      ...(mode === "edit" && { ...profileData }),
    },
    validationSchema: yup.object({
      email: yup.string().required("email is required"),
      name: yup.string().required("name is required"),
      role: yup.string().required("role is required"),
      bio: yup.string().required("bio is required"),
      facebook: yup.string().required("facebook is required"),
      instagram: yup.string().required("instagram is required"),
      linkedin: yup.string().required("linkedin is required"),
      twitter: yup.string().required("twitter is required"),
      avatar: yup.string().required("avatar is required"),
      ...(mode === "add" && {
        password: yup
          .string()
          .min(8, "Password should be of minimum 8 characters length")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
          )
          .required("Password is required"),
      }),
    }),
    validateOnChange: true,
    onSubmit: (values) => {
      if (mode === "edit" && profileData) {
        db.updateUser({ ...values, id: profileData.id });
      } else if (mode === "add" && values.password) {
        db.addUser({ ...values, password: values.password, role: values.role as IRole });
      }
    },
    enableReinitialize: true,
  });

  return (
    <PublicLayout maxWidth={"md"}>
      <Container maxWidth={"md"}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ display: "flex", flexDirection: "row-reverse" }}>
              {mode !== "add" && (
                <ButtonGroup variant="outlined" size="small" disableElevation aria-label="outlined button group">
                  <Button
                    variant={disabled ? "contained" : "outlined"}
                    sx={{ p: 1.5 }}
                    onClick={() => {
                      setDisabled(true);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    variant={disabled ? "outlined" : "contained"}
                    sx={{ p: 1.5 }}
                    onClick={() => {
                      setDisabled(false);
                    }}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              )}
            </Grid>
            <Grid item xs={4}>
              <Avatar
                variant={"rounded"}
                sx={{ width: "100%", height: "fit-content", my: 2 }}
                src={formik.values.avatar ?? profileData?.avatar}
              />
            </Grid>

            <Grid item xs={8}>
              {fields.map((field) => (
                <TextField
                  variant={"filled"}
                  fullWidth
                  margin={"normal"}
                  id={field}
                  label={field}
                  name={field}
                  autoComplete={field}
                  autoFocus
                  type={field === "password" ? "password" : "text"}
                  value={formik.values[field as keyof typeof formik.values]}
                  disabled={disabled}
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
          </Grid>{" "}
        </form>
      </Container>
    </PublicLayout>
  );
};
export default Profile;
