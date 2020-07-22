import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import AppBar from "@material-ui/core/AppBar";
import SortableTabs from "../src/containers/tabs/SortableTabs";
import {
  serverAddTab,
  setPageNumber,
  serverSetOffset,
  serverSetPageNumbers,
} from "../src/redux/articleTabs/actions";
import DefaultErrorPage from "next/error";
import Banner from "../src/containers/common/Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ArticlesObj } from "../src/types/article";
import fetcher from "../src/utils/fetcher";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../src/redux/common/actions";
import { TabQuery } from "../src/types/tab";
import { TabPagesType } from "../src/redux/articleTabs/type";

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
        <AppBar position="static" color="default">
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
    const { type, value } = initialTab;
    const { token, offset = 20 } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const initialPage = page && +page > 0 ? +page - 1 : 0;
    const initialArticles = await fetcher.get<ArticlesObj>(
      getArticlesUrl(type, value, initialPage, +offset),
      token
    );
    const defaultTabs: TabPagesType = {
      default: 0,
    };
    if (token) defaultTabs.feed = 0;
    if (type === "tag" && value)
      ctx.store.dispatch(serverAddTab(type + "-" + value, initialPage));
    else if (type === "feed" && token) defaultTabs.feed = initialPage;
    else defaultTabs.default = initialPage;
    ctx.store.dispatch(serverSetPageNumbers(defaultTabs));
    ctx.store.dispatch(serverSetOffset(+offset));
    if (type !== "tag" && (!token || type !== "feed"))
      initialTab.type = "default";
    return {
      props: {
        initialArticles,
        initialTab,
      },
    };
  }
);

export default Index;
