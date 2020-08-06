import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
const makeTheme = (dark: boolean) =>
  responsiveFontSizes(
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
      palette: {
        type: dark ? "dark" : "light",
      },
      overrides: {
        MuiContainer: {
          root: {
            display: undefined,
            width: undefined,
            marginLeft: undefined,
            marginRight: undefined,
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
export default makeTheme;
