import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: "OpenSans",
      h5: {
        fontWeight: "bold",
      },
      h2: {
        fontWeight: "bold",
      },
      h1: {
        fontWeight: "bold",
      },
    },
    overrides: {
      MuiContainer: {
        root: {
          display: undefined,
          width: undefined,
          marginLeft: undefined,
          marginRight: undefined,
          ":not(header) > &": {
            overflow: "hidden",
          },
        },
      },
      MuiAppBar: {
        root: {
          flexDirection: undefined,
          minHeight: "72px",
        },
      },
      MuiTabs: {
        root: {
          minHeight: undefined,
          height: "100%",
        },
        scroller: {
          height: "100%",
          display: "inline-flex",
        },
      },
    },
  })
);

const makeTheme = (dark: boolean) => ({
  ...theme,
  palette: createPalette({ type: dark ? "dark" : "light" }),
});

export default makeTheme;
