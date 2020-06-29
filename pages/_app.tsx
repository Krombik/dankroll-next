import { wrapper } from "../src/redux/store";
import Layout from "../src/components/common/Layout";
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useEffect, FC, useMemo } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import useTheme from "../src/utils/theme";
import { AppProps } from "next/app";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../src/types";
import { getFromStorage, setToStorage } from "../src/utils/storage";
import { addTabsFromStorage } from "../src/redux/articleTabs/actions";
import { setDark, setAuthorized } from "../src/redux/common/actions";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (state: State) => state.common.token,
  (state: State) => state.articleTabs.tabOrder,
  (isDark, token, tabOrder) => ({ isDark, token, tabOrder })
);

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const { isDark, tabOrder, token } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
    const clientToken = getFromStorage<string>("token");
    if (clientToken) dispatch(setAuthorized(clientToken));
    const clientOrder = getFromStorage<string[]>("tabOrder");
    if (clientOrder?.length > 0) dispatch(addTabsFromStorage(clientOrder));
    const clientTheme = getFromStorage<boolean>("isDark");
    if (clientTheme === false || clientTheme === true)
      dispatch(setDark(clientTheme));
  }, []);
  useEffect(() => {
    setToStorage("tabOrder", tabOrder);
  }, [tabOrder]);
  useEffect(() => {
    setToStorage("isDark", isDark);
  }, [isDark]);
  useEffect(() => {
    setToStorage("token", token);
  }, [token]);
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
