import { FunctionComponent } from "react";
import { IUser } from "../../core/hooks/useGetUsers";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { db } from "../../db";
import { toast } from "react-toastify";
import { IRole } from "../../core/hooks/useUser";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import * as React from "react";
import { IProfile } from "../pages/Profile";

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
      ...(mode !== "add" && { ...profileData }),
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
      if (mode !== "add" && profileData) {
        db.updateUser({ ...values, id: profileData.id }).then((response) => {
          if (response.success) {
            toast.success(response.data);
            navigate("/user/" + profileData.id);
          } else {
            toast.error(response.data);
          }
        });
      } else if (mode === "add" && values.password) {
        db.addUser({ ...values, password: values.password, role: values.role as IRole }).then((response) => {
          if (response.success) {
            toast.success("Successfully added!");
            navigate("/user/" + response.data);
          } else {
            toast.error(response.data);
          }
        });
      }
    },
    enableReinitialize: true,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
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
        <Grid item xs={8}>
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
