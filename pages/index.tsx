import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer, FetchRV } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { fetcher } from "../src/utils/fetcher";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../src/types";
import TabsContainer from "../src/containers/tabs/TabsContainer";
import { serverAddTab } from "../src/redux/article/actions";
import { ArticlesObj } from "../src/types/article";
import DefaultErrorPage from "next/error";

const selectData = createSelector(
  (state: State) => state.article.tabList,
  (state: State) => state.article.currTab,
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
    initialKey !== key ? {} : { initialPage, initialData: [initialArticles] };
  return (
    <div>
      <TabContext value={currTab}>
        <TabsContainer tabList={tabList} />
        <TabPanel value="default-">
          <ArticleList {...isTabInitial("default-")} value="" type="default" />
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
    </div>
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
    const initialArticles = await fetcher<FetchRV<ArticlesObj>>(
      getArticlesUrl({ ...initialTab, page })
    );
    if (initialTab.type !== "default") dispatch(serverAddTab(initialTab, page));
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
