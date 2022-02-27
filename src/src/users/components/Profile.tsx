import * as React from "react";
import { FunctionComponent, useState } from "react";
import PublicLayout from "../../core/components/PublicLayout";
import { useParams } from "react-router-dom";
import { Avatar, Box, Button, ButtonGroup, Container, Grid, TextField } from "@mui/material";
import { useCurrentUser } from "../../core/hooks/reduxHooks";

export interface IProfile {
  variant: "self" | "other";
}
const Profile: FunctionComponent<IProfile> = ({ variant }) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const user = useCurrentUser();
  let params = useParams();

  return (
    <PublicLayout maxWidth={"md"}>
      <Container maxWidth={"md"}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "row-reverse" }}>
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
          </Grid>
          <Grid item xs={4}>
            <Avatar
              variant={"rounded"}
              sx={{ width: "100%", height: "fit-content", my: 2 }}
              src={"https://via.placeholder.com/300"}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id="email"
              label={"Email"}
              name="email"
              autoComplete="email"
              autoFocus
              value={"Milad"}
              disabled={disabled}
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // error={formik.touched.email}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id="facebook"
              label={"Facebook"}
              name="facebook"
              autoComplete="facebook"
              value={"Milad"}
              disabled={disabled}
              autoFocus
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // error={formik.touched.email}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id="twitter"
              label={"Twitter"}
              name="twitter"
              autoComplete="twitter"
              value={"Milad"}
              disabled={disabled}
              autoFocus
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // error={formik.touched.email}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id="instagram"
              label={"Instagram"}
              name="instagram"
              autoComplete="instagram"
              value={"Milad"}
              disabled={disabled}
              autoFocus
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // error={formik.touched.email}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant={"filled"}
              fullWidth
              margin={"normal"}
              id="linkedin"
              label={"Linkedin"}
              name="linkedin"
              autoComplete="linkedin"
              value={"Milad"}
              disabled={disabled}
              autoFocus
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // error={formik.touched.email}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              variant={"filled"}
              multiline
              minRows={6}
              fullWidth
              margin={"normal"}
              id="bio"
              label={"Bio"}
              name="bio"
              autoComplete="bio"
              value={"Milad"}
              disabled={disabled}
              autoFocus
              // onChange={formik.handleChange}
              // value={formik.values.email}
              // error={formik.touched.email}
              // helperText={formik.touched.email && formik.errors.email}
            />
            <Box sx={{ display: "flex", width: "100%", flexDirection: "row-reverse", py: 1 }}>
              <Button variant={"contained"}>Save Changes</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
};
export default Profile;
