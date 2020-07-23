import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import AppBar from "@material-ui/core/AppBar";
import SortableTabs from "../src/containers/tabs/SortableTabs";
import {
  serverSetOffset,
  setPageNumber,
  addTab,
} from "../src/redux/articleTabs/actions";
import DefaultErrorPage from "next/error";
import Banner from "../src/containers/common/Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ArticlesObj } from "../src/types/article";
import fetcher from "../src/utils/fetcher";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../src/redux/authentication/actions";
import { TabQuery } from "../src/types/tab";

const Index: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticles,
  initialTab,
}) => {
  if (initialArticles.status && !initialArticles.articles)
    return <DefaultErrorPage statusCode={initialArticles.status} />;
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
        <AppBar position="static" color="default" component="nav">
          <SortableTabs />
        </AppBar>
        <ArticleList
          initialData={initialArticles}
          initialTab={initialTab}
          emptyType="default"
          valueKey="value"
        />
      </Grid>
    </Grid>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { page, ...initialTab }: TabQuery = ctx.query;
    const { token, offset = 20 } = parseCookies(ctx);
    if (
      initialTab.type &&
      (initialTab.type !== "tag" || !initialTab.value) &&
      (initialTab.type !== "feed" || !token)
    ) {
      ctx.res.writeHead(301, { Location: "/" }).end();
      return null;
    }
    if (!initialTab.type) initialTab.type = "default";
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const initialPage = page && +page > 0 ? +page - 1 : 0;
    const initialArticles = await fetcher.get<ArticlesObj>(
      getArticlesUrl(initialTab.type, initialTab.value, initialPage, +offset),
      token
    );
    let key = initialTab.type;
    if (initialTab.type === "tag") {
      key = initialTab.type + "-" + initialTab.value;
      ctx.store.dispatch(addTab(key));
    }
    if (initialPage) ctx.store.dispatch(setPageNumber({ [key]: initialPage }));
    ctx.store.dispatch(serverSetOffset(+offset));
    return {
      props: {
        initialArticles,
        initialTab,
      },
    };
  }
);

export default Index;
