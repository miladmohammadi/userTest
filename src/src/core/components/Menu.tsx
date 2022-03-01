import React, { FunctionComponent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Box, Button, Container, CssBaseline, IconButton, Toolbar, useScrollTrigger } from "@mui/material";
import { useLogout } from "../hooks/reduxHooks";
import { Link } from "react-router-dom";
import { Breakpoint } from "@mui/system";

const Menu: FunctionComponent<Props> = (props) => {
  const { children, window, maxWidth } = props;
  const user = useLogout();
  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ backgroundColor: "#f0f3e8", p: 0 }}>
          <Toolbar sx={{ backgroundColor: "#f0f3e8", p: 0 }}>
            <Container maxWidth={maxWidth}>
              <Link to={"/users"}>
                <Button
                  sx={{
                    m: 0,
                    minHeight: 64,
                    borderRadius: 0,
                    backgroundColor: "#f0f3e8",
                  }}
                >
                  Users
                </Button>
              </Link>
              <Link to={"/user/profile"}>
                <Button
                  sx={{
                    m: 0,
                    minHeight: 64,
                    borderRadius: 0,
                    backgroundColor: "#f0f3e8",
                  }}
                >
                  Profile
                </Button>
              </Link>
            </Container>
            <IconButton
              edge="end"
              onClick={() => {
                user.logout();
              }}
              sx={{ mr: 1 }}
            >
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Box sx={{ py: 5 }}>{children}</Box>
    </>
  );
};
export default Menu;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
  maxWidth: Breakpoint | false;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
}
