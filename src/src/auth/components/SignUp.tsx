import { FunctionComponent } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useUser } from "../../core/hooks/useUser";
import { db } from "../../db";
import AuthPagesLayout from "../../core/components/AuthPagesLayout";
import { addDemoData } from "../../core/utils/demoData";
import useFormControl from "../../core/hooks/FormControl/useFormControl";
import { emailValidator, passwordValidator } from "../../core/hooks/FormControl/validationFunctions";

const SignUp: FunctionComponent = () => {
  const user = useUser(db);
  const formik = useFormControl({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: {
      email: emailValidator,
      password: passwordValidator,
      confirm_password: passwordValidator,
    },
    onSubmit: (values) => {
      user.add(values);
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
        <Typography component="h1" variant="h5">
          Sign Up
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
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              name="confirm_password"
              label={"Confirm Password"}
              type="password"
              id="confirm_password"
              autoComplete="confirm-password"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
              error={formik.touched.confirm_password}
              helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {"Submit"}
            </Button>
            <Link to={"/login"}>
              <Button color="primary" fullWidth sx={{ mt: 2 }}>
                {"Login"}
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
export default SignUp;
