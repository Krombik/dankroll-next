import { wrapper } from "../src/redux/store";
import { ThunkContext, StaticProps } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import SpecialTab from "../src/containers/article/SpecialTab";
import { getArticlesUrl } from "../src/api/article";
import { NextPage } from "next";
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { serverFetcher } from "../src/utils/fetcher";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../src/types";
import { useDispatch } from "react-redux";
import { setTab, moveTab } from "../src/redux/actions/article";
import { SortableContainer } from "react-sortable-hoc";
import { memo } from "react";

const SortableList = SortableContainer(({ children }) => {
  return <>{children}</>;
});

const selectData = createSelector(
  (state: State) => state.article.tabList,
  (state: State) => state.article.currTabIndex,
  (state: State) => state.article.tabOrder,
  (tabList, currTabIndex, tabOrder) => ({ tabList, currTabIndex, tabOrder })
);

const Index: NextPage<StaticProps<typeof getStaticProps>> = ({
  initialArticles,
}) => {
  const { tabList, currTabIndex, tabOrder } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = (_, newValue: string) => {
    dispatch(setTab(tabList.findIndex((tab) => tab.key === newValue)));
  };
  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(moveTab(oldIndex, newIndex));
  };
  return (
    <div>
      <TabContext value={tabList[currTabIndex].key}>
        <AppBar position="static" color="default">
          <SortableList
            axis={"x"}
            lockAxis={"x"}
            distance={10}
            onSortEnd={onSortEnd}
          >
            <TabList onChange={handleChange}>
              {tabOrder.map((tabIndex, index) => (
                <SpecialTab
                  value={tabList[tabIndex].key}
                  tab={tabList[tabIndex]}
                  key={index}
                  tabIndex={index}
                />
              ))}
            </TabList>
          </SortableList>
        </AppBar>
        {tabList.map((tab, index) => (
          <TabPanel value={tab.key} key={index}>
            <ArticleList
              initialData={
                tab.type === "default" ? [initialArticles] : undefined
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
export const getStaticProps = wrapper.getStaticProps(
  async ({ store: { dispatch } }: ThunkContext) => {
    const initialArticles = await serverFetcher(getArticlesUrl({}));
    return { props: { initialArticles } };
  }
);

export default Index;
