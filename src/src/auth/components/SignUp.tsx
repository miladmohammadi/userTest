import { FunctionComponent } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import PublicLayout from "../../core/components/PublicLayout";

const SignUp: FunctionComponent = () => {
  return (
    <PublicLayout>
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
          <TextField
            variant={"filled"}
            required
            fullWidth
            margin={"normal"}
            id="email"
            label={"Email"}
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <TextField
            variant={"filled"}
            required
            fullWidth
            margin={"normal"}
            name="confirm-password"
            label={"Confirm Password"}
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {"Submit"}
          </Button>
          <Button color="primary" fullWidth sx={{ mt: 2 }}>
            {"Login"}
          </Button>
        </Box>
      </Container>
    </PublicLayout>
  );
};
export default SignUp;
