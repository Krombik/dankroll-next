import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer, FetchRV } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import AppBar from "@material-ui/core/AppBar";
import SortableTabs from "../src/containers/tabs/SortableTabs";
import { serverAddTab, setPageNumber } from "../src/redux/articleTabs/actions";
import DefaultErrorPage from "next/error";
import Banner from "../src/containers/common/Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ArticlesObj } from "../src/types/article";
import fetcher from "../src/utils/fetcher";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../src/redux/common/actions";
import { useRef } from "react";

const Index: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticles,
  initialTab,
}) => {
  if (initialArticles && initialArticles.error)
    return (
      <DefaultErrorPage
        statusCode={+initialArticles.status}
        title={initialArticles.error}
      />
    );
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Banner>
          <Grid item container justify="center">
            <Typography variant="h1" color="textPrimary">
              Blog-test
            </Typography>
          </Grid>
        </Banner>
      </Grid>
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <SortableTabs />
        </AppBar>
        <ArticleList
          initialData={[initialArticles]}
          initialDataRef={useRef([initialArticles])}
          initialTab={initialTab}
          emptyType="default"
        />
      </Grid>
    </Grid>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { type = "default", value = "", page }: any = ctx.query;
    const { token } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const initialPage = page && +page > 0 ? +page - 1 : 0;
    const initialTab = { type, value };
    const initialArticles = await fetcher.get<FetchRV<ArticlesObj>>(
      getArticlesUrl(type, value, initialPage),
      token
    );
    if (type !== "default" && type !== "feed")
      ctx.store.dispatch(serverAddTab(initialTab, initialPage));
    else ctx.store.dispatch(setPageNumber(type, initialPage));
    return {
      props: {
        initialArticles,
        initialTab,
      },
    };
  }
);

export default Index;
