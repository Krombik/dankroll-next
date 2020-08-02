import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
const makeTheme = (isDark: boolean) =>
  responsiveFontSizes(
    createMuiTheme({
      typography: {
        fontFamily: "OpenSans",
        h5: {
          fontWeight: "bold",
        },
        h2: {
          fontWeight: "bold",
          position: "relative",
        },
        h1: {
          fontWeight: "bold",
          position: "relative",
        },
        body1: {
          position: "relative",
        },
      },
      palette: {
        type: isDark ? "dark" : "light",
      },
    })
  );
export default makeTheme;
