import { wrapper } from "../src/redux/store";
import Layout from "../src/components/common/LayoutComponent";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useEffect, FC } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/utils/theme";
import { AppProps } from "next/app";

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);
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
