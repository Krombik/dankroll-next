import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer, FetchRV } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import TabPanel from "@material-ui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../src/types";
import TabsContainer from "../src/containers/tabs/TabsContainer";
import { serverAddTab, setPageNumber } from "../src/redux/articleTabs/actions";
import DefaultErrorPage from "next/error";
import Banner from "../src/containers/common/Banner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ArticlesObj } from "../src/types/article";
import fetcher from "../src/utils/fetcher";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../src/redux/common/actions";
import TabsContext from "../src/containers/tabs/TabsContext";

const selectData = createSelector(
  (state: State) => state.articleTabs.tabList,
  (state: State) => state.common.currentUserName,
  (tabList, currentUserName) => ({ tabList, currentUserName })
);

const Index: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticles,
  initialKey,
  initialPage,
}) => {
  if (initialArticles && initialArticles.error)
    return (
      <DefaultErrorPage
        statusCode={+initialArticles.status}
        title={initialArticles.error}
      />
    );
  const { tabList, currentUserName } = useSelector(selectData);
  const isTabInitial = (key: string) =>
    initialKey !== key
      ? { initialPage: 0 }
      : { initialPage, initialData: [initialArticles] };
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
        <TabsContext defaultType="default">
          <TabsContainer tabList={tabList} />
          {currentUserName && (
            <TabPanel value="feed">
              <ArticleList {...isTabInitial("feed")} value="" type="feed" />
            </TabPanel>
          )}
          <TabPanel value="default">
            <ArticleList {...isTabInitial("default")} value="" type="default" />
          </TabPanel>
          {tabList.map((tab, index) => (
            <TabPanel value={tab.key} key={index}>
              <ArticleList
                {...isTabInitial(tab.key)}
                value={tab.value}
                type={tab.type}
              />
            </TabPanel>
          ))}
        </TabsContext>
      </Grid>
    </Grid>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { type, value, page }: any = ctx.query;
    const { token } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const initialPage = page && +page > 0 ? +page - 1 : 0;
    const initialTab = { type: type || "default", value: value || "" };
    const initialArticles = await fetcher.get<FetchRV<ArticlesObj>>(
      getArticlesUrl(initialTab.type, initialTab.value, initialPage),
      token
    );
    let initialKey: string;
    if (initialTab.type !== "default" && initialTab.type !== "feed") {
      initialKey = ctx.store.dispatch(serverAddTab(initialTab, initialPage));
    } else {
      ctx.store.dispatch(setPageNumber(initialTab.type, initialPage));
      initialKey = initialTab.type;
    }
    return {
      props: {
        initialArticles,
        initialKey,
        initialPage,
      },
    };
  }
);

export default Index;
