import { wrapper } from "../../src/redux/store";
import {
  ServerSideContext,
  PropsFromServer,
  FetchRV,
  State,
} from "../../src/types";
import { getArticlesUrl } from "../../src/api/article";
import { NextPage } from "next";
import { fetcher } from "../../src/utils/fetcher";
import { ArticlesObj } from "../../src/types/article";
import DefaultErrorPage from "next/error";
import Router, { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabList from "@material-ui/lab/TabList";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import { getUserUrl } from "../../src/api/user";
import { UserObj } from "../../src/types/user";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import Banner from "../../src/containers/common/Banner";
import Spinner from "../../src/components/common/Spinner";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ArticleList from "../../src/containers/article/ArticlesList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setPageNumber } from "../../src/redux/articleTabs/actions";
import urlToQuery from "../../src/utils/urlToQuery";

const selectData = createSelector(
  (state: State) => state.articleTabs.articlePageNumbers,
  (articlePageNumbers) => ({ articlePageNumbers })
);

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialUser,
  initialArticles,
  initialPage,
  initialTab,
}) => {
  if (initialUser && initialUser.error)
    return (
      <DefaultErrorPage
        statusCode={+initialUser.status}
        title={initialUser.error}
      />
    );
  const {
    query: { username },
    push,
  }: any = useRouter();
  const { data: userData } = useSWR<FetchRV<UserObj>>(
    getUserUrl(username),
    fetcher,
    {
      initialData: initialUser,
    }
  );
  const [tab, setTab] = useState(initialTab);
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const oldQuery = Router.query;
      const { favorited } = urlToQuery(url);
      if (favorited !== oldQuery.favorited)
        setTab(favorited ? "favorited" : "author");
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);
  const user = userData?.profile;
  const isTabInitial = (type: string) =>
    initialTab !== type
      ? { initialPage: 0 }
      : { initialPage, initialData: [initialArticles] };
  const { articlePageNumbers } = useSelector(selectData);
  const handleChange = (_: any, newValue: string) => {
    const page = articlePageNumbers[newValue] + 1;
    const query = {
      ...(newValue === "favorited" ? { favorited: true } : {}),
      ...(page > 1 ? { page } : {}),
    };
    push(
      { query, pathname: "/user/[username]" },
      { query, pathname: `/user/${username}` },
      { shallow: true }
    );
  };
  return (
    <Grid container spacing={3}>
      {user ? (
        <Grid item xs={12}>
          <Banner>
            <Grid item container justify="center">
              <Avatar src={user.image} sizes="large">
                {user.username[0]}
              </Avatar>
            </Grid>
            <Grid item container justify="center">
              <Typography variant="h2" color="textPrimary">
                {user.username}
              </Typography>
            </Grid>
            <Grid item container justify="center">
              <Typography color="textPrimary">{user.bio}</Typography>
            </Grid>
          </Banner>
        </Grid>
      ) : (
        <Spinner />
      )}
      <Grid item xs={12}>
        <TabContext value={tab}>
          <AppBar position="static" color="default">
            <TabList onChange={handleChange}>
              <Tab value="author" label="Last articles" />
              <Tab value="favorited" label="Favorite articles" />
            </TabList>
          </AppBar>
          <TabPanel value="author">
            <ArticleList
              {...isTabInitial("author")}
              value={username}
              type="author"
            />
          </TabPanel>
          <TabPanel value="favorited">
            <ArticleList
              {...isTabInitial("favorited")}
              value={username}
              type="favorited"
            />
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query, store: { dispatch } }: ServerSideContext) => {
    const { username, page: queryPage, favorited }: any = query;
    const page = queryPage && +queryPage > 0 ? +queryPage - 1 : 0;
    const initialUser = await fetcher<FetchRV<UserObj>>(getUserUrl(username));
    const initialTab = favorited ? "favorited" : "author";
    const initialArticles = await fetcher<FetchRV<ArticlesObj>>(
      getArticlesUrl({ type: initialTab, value: username, page })
    );
    dispatch(setPageNumber(initialTab + "-" + username, page));
    return {
      props: { initialUser, initialArticles, initialPage: page, initialTab },
    };
  }
);

export default ArticlePage;
