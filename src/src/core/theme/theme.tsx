import { createTheme } from "@mui/material/styles";

let mainTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      light: "rgba(219,121,136,1)",
      main: "rgba(219,121,136,1)",
      dark: "rgba(219,121,136,1)",
      contrastText: "#f5f9ea",
    },
    background: {
      default: "#f5f9ea",
    },
  },
  shape: {
    borderRadius: 15,
  },
});

mainTheme = createTheme(mainTheme, {
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          padding: "16px 24px",
          textTransform: "none" as any,
        },
        label: {
          fontWeight: mainTheme.typography.fontWeightBold,
        },
        text: {
          padding: "16px 16px",
        },
      },
    },
    MuiFilledInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderRadius: mainTheme.shape.borderRadius,
          overflow: "hidden",
        },
      },
    },
  },
});

export default mainTheme;
