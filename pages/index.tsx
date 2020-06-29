import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticles } from "../src/api/article";
import { NextPage } from "next";
import TabContext from "@material-ui/lab/TabContext";
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

const selectData = createSelector(
  (state: State) => state.articleTabs.tabList,
  (state: State) => state.articleTabs.currTab,
  (tabList, currTab) => ({ tabList, currTab })
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
  const { tabList, currTab } = useSelector(selectData);
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
        <TabContext value={currTab}>
          <TabsContainer tabList={tabList} />
          <TabPanel value="default-">
            <ArticleList
              {...isTabInitial("default-")}
              value=""
              type="default"
            />
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
        </TabContext>
      </Grid>
    </Grid>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query, store: { dispatch } }: ServerSideContext) => {
    const { tag, author, page: queryPage }: any = query;
    const page = queryPage && +queryPage > 0 ? +queryPage - 1 : 0;
    const initialTab = tag
      ? { type: "tag", value: tag }
      : author
      ? { type: "author", value: author }
      : { type: "default", value: "" };
    const initialArticles = await getArticles(
      initialTab.type,
      initialTab.value,
      page
    );
    if (initialTab.type !== "default") dispatch(serverAddTab(initialTab, page));
    else dispatch(setPageNumber("default-", page));
    return {
      props: {
        initialArticles: initialArticles,
        initialKey: initialTab.type + "-" + initialTab.value,
        initialPage: page,
      },
    };
  }
);

export default Index;
