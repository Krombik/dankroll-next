import { wrapper } from "../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { serverFetcher } from "../src/utils/fetcher";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../src/types";
import TabsContainer from "../src/containers/article/tabs/TabsContainer";
import { serverAddTab } from "../src/redux/actions/article";

const selectData = createSelector(
  (state: State) => state.article.tabList,
  (state: State) => state.article.currTab,
  (tabList, currTab) => ({ tabList, currTab })
);

const Index: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticles,
  initialKey,
}) => {
  const { tabList, currTab } = useSelector(selectData);
  return (
    <div>
      <TabContext value={currTab}>
        <TabsContainer tabList={tabList} />
        <TabPanel value="default-">
          <ArticleList
            initialData={
              initialKey === "default-" ? [initialArticles] : undefined
            }
            value=""
            type="default"
          />
        </TabPanel>
        {tabList.map((tab, index) => (
          <TabPanel value={tab.key} key={index}>
            <ArticleList
              initialData={
                initialKey !== tab.key ? undefined : [initialArticles]
              }
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
    const { tag, author }: any = query;
    const initialTab =
      tag !== undefined
        ? { type: "tag", value: tag }
        : author !== undefined
        ? { type: "author", value: author }
        : { type: "default", value: "" };
    const initialArticles = await serverFetcher(getArticlesUrl(initialTab));
    if (initialTab.type !== "default") dispatch(serverAddTab(initialTab));
    return {
      props: {
        initialArticles,
        initialKey: initialTab.type + "-" + initialTab.value,
      },
    };
  }
);

export default Index;
