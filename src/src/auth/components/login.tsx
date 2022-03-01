import { FunctionComponent } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLogin } from "../../core/hooks/reduxHooks";
import AuthPagesLayout from "../../core/components/AuthPagesLayout";
import { addDemoData } from "../../core/utils/demoData";

const Login: FunctionComponent = () => {
  const user = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: true,
    validationSchema: yup.object({
      email: yup.string().email("Enter a valid email").required("Email is required"),
      password: yup
        .string()
        .min(8, "Password should be of minimum 8 characters length")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
        )
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      user.loginUser(values);
    },
  });
  return (
    <AuthPagesLayout>
      <Container
        sx={{
          maxWidth: "430px!important",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant={"caption"}>
          First Add Demo Data then login with demo account (or sign up) user: milad@gmail.com - pass: Milad123
        </Typography>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box marginTop={3}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id="email"
              label={"Email"}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant={"filled"}
              required
              fullWidth
              margin={"normal"}
              name="password"
              label={"Password"}
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {"Submit"}
            </Button>
            <Link to={"/signup"}>
              <Button color="primary" fullWidth sx={{ mt: 2 }}>
                {"Sign Up"}
              </Button>
            </Link>
            <Button
              fullWidth
              onClick={() => {
                addDemoData();
              }}
            >
              {"Add Demo Data"}
            </Button>
          </form>
        </Box>
      </Container>
    </AuthPagesLayout>
  );
};
export default Login;
