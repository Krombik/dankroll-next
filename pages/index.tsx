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
import { useRouter } from "next/router";
import { Context } from "next-redux-wrapper";
import { addTab, setTab } from "../src/redux/actions/article";

const selectData = createSelector(
  (state: State) => state.article.tabList,
  (state: State) => state.article.currTab,
  (tabList, currTab) => ({ tabList, currTab })
);

const Index: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticles,
}) => {
  const { tabList, currTab } = useSelector(selectData);
  // const { query } = useRouter();
  // const { tag, author }: any = query;
  // const tab
  return (
    <div>
      <TabContext value={currTab}>
        <TabsContainer tabList={tabList} />
        <TabPanel value="default">
          <ArticleList
            initialData={[initialArticles]}
            value=""
            type="default"
          />
        </TabPanel>
        {tabList.map((tab, index) => (
          <TabPanel value={tab.key} key={index}>
            <ArticleList value={tab.value} type={tab.type} />
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query, store: { dispatch } }: ServerSideContext) => {
    const { tag, author }: any = query;
    const typeValue =
      tag !== undefined
        ? { type: "tag", value: tag }
        : author !== undefined
        ? { type: "author", value: author }
        : { type: "default", value: "" };
    const initialArticles = await serverFetcher(getArticlesUrl(typeValue));
    dispatch(setTab(dispatch(addTab(typeValue))));
    return { props: { initialArticles } };
  }
);

export default Index;
