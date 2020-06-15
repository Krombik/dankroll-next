import { wrapper } from "../src/redux/store";
import { ThunkContext, StaticProps } from "../src/types";
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

const selectData = createSelector(
  (state: State) => state.article.tabList,
  (state: State) => state.article.currTab,
  (tabList, currTab) => ({ tabList, currTab })
);

const Index: NextPage<StaticProps<typeof getStaticProps>> = ({
  initialArticles,
}) => {
  const { tabList, currTab } = useSelector(selectData);
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
export const getStaticProps = wrapper.getStaticProps(
  async ({ store: { dispatch } }: ThunkContext) => {
    const initialArticles = await serverFetcher(getArticlesUrl({}));
    return { props: { initialArticles } };
  }
);

export default Index;
