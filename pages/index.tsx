import { wrapper } from "../src/redux/store";
import { ThunkContext, StaticProps } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getAllArticles, getArticlesUrl } from "../src/api/article";
import useSWR, { useSWRInfinite } from "swr";
import Maybe from "../src/containers/common/Maybe";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { serverFetcher } from "../src/utils/fetcher";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State, ThunkDispatcher } from "../src/types";
import { useDispatch } from "react-redux";
import { addTag, setTab } from "../src/redux/actions/article";

const selectData = createSelector(
  (state: State) => state.article.tagList,
  (state: State) => state.article.tab,
  (tagList, tab) => ({ tagList, tab })
);

const Index: NextPage<StaticProps<typeof getStaticProps>> = ({
  initialArticles,
}) => {
  const { tagList, tab } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = (_, newValue: string) => {
    dispatch(setTab(newValue));
  };
  const tabs = [
    <Tab label="Last articles" value="default" key={0} />,
    ...tagList.map((tag, index) => (
      <Tab key={index + 1} label={"#" + tag} value={tag} />
    )),
  ];
  return (
    <TabContext value={tab}>
      <AppBar position="static" color="default">
        <TabList onChange={handleChange}>{tabs}</TabList>
      </AppBar>
      <TabPanel value="default">
        <ArticleList initialData={[initialArticles]} />
      </TabPanel>
      {tagList.map((tag, index) => (
        <TabPanel value={tag} key={index}>
          <ArticleList value={tag} type="tag" />
        </TabPanel>
      ))}
    </TabContext>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store: { dispatch } }: ThunkContext) => {
    // await dispatch(getArticleList());
    const initialArticles = await serverFetcher(getArticlesUrl({}));
    return { props: { initialArticles } };
  }
);

export default Index;
