import { wrapper } from "../src/redux/store";
import Layout from "../src/components/common/Layout";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useEffect, FC, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeTheme from "../src/utils/makeTheme";
import { AppProps } from "next/app";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../src/types";
import { GlobalStyle } from "../src/components/common/styled";

const selectData = createSelector(
  (state: State) => state.common.dark,
  (dark) => ({ dark })
);

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { dark } = useSelector(selectData);
  useEffect(() => {
    document.querySelector("#jss-server-side")?.remove();
  }, []);
  const theme = useMemo(() => makeTheme(dark), [dark]);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default wrapper.withRedux(WrappedApp);
