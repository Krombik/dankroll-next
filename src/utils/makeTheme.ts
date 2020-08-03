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
        },
        h1: {
          fontWeight: "bold",
        },
      },
      palette: {
        type: isDark ? "dark" : "light",
      },
    })
  );
export default makeTheme;
