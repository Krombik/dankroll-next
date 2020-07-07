import { wrapper } from "../../src/redux/store";
import {
  ServerSideContext,
  PropsFromServer,
  State,
  FetchRV,
} from "../../src/types";
import { getArticlesUrl } from "../../src/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { getUserUrl } from "../../src/api/user";
import Grid from "@material-ui/core/Grid";
import useSWR from "swr";
import Banner from "../../src/containers/common/Banner";
import Spinner from "../../src/components/common/Spinner";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ArticleList from "../../src/containers/article/ArticlesList";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setPageNumber } from "../../src/redux/articleTabs/actions";
import { ArticlesObj } from "../../src/types/article";
import fetcher from "../../src/utils/fetcher";
import { UserObj } from "../../src/types/user";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../../src/redux/common/actions";
import TabsContext from "../../src/containers/tabs/TabsContext";

const selectData = createSelector(
  (state: State) => state.articleTabs.articlePageNumbers,
  (state: State) => state.common.token,
  (articlePageNumbers, token) => ({ articlePageNumbers, token })
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
  const { articlePageNumbers, token } = useSelector(selectData);
  const { data: userData } = useSWR<FetchRV<UserObj>>(
    [getUserUrl(username), token],
    fetcher.get,
    {
      initialData: initialUser,
    }
  );
  const user = userData?.profile;
  const isTabInitial = (type: string) =>
    initialTab !== type
      ? { initialPage: 0 }
      : { initialPage, initialData: [initialArticles] };
  const handleChange = (_: any, newValue: string) => {
    const page = articlePageNumbers[newValue] + 1;
    const query = {
      ...(newValue === "favorited" ? { type: newValue } : {}),
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
        <TabsContext defaultType="author">
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
        </TabsContext>
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { username, page: queryPage, favorited }: any = ctx.query;
    const { token } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const page = queryPage && +queryPage > 0 ? +queryPage - 1 : 0;
    const initialUser = await fetcher.get<FetchRV<UserObj>>(
      getUserUrl(username),
      token
    );
    const initialTab = favorited ? "favorited" : "author";
    const initialArticles = await fetcher.get<FetchRV<ArticlesObj>>(
      getArticlesUrl(initialTab, username, page),
      token
    );
    ctx.store.dispatch(setPageNumber(initialTab + "-" + username, page));
    return {
      props: {
        initialUser,
        initialArticles,
        initialPage: page,
        initialTab,
      },
    };
  }
);

export default ArticlePage;
