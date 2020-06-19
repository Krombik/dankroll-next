import { wrapper } from "../src/redux/store";
import Layout from "../src/components/common/LayoutComponent";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useEffect, FC, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useTheme from "../src/utils/theme";
import { AppProps } from "next/app";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../src/types";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (isDark) => ({ isDark })
);

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);
  const { isDark } = useSelector(selectData);
  const theme = useMemo(() => useTheme(isDark), [isDark]);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
