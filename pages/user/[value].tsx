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
import { useRef } from "react";
import Tabs from "../../src/containers/tabs/Tabs";
import BannerButton from "../../src/components/common/BannerButton";
import UserSubscribeButton from "../../src/containers/user/UserSubscribeButton";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.common.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialUser,
  initialArticles,
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
    query: { value },
  }: any = useRouter();
  const { token, currentUserName } = useSelector(selectData);
  const initialUserRef = useRef(initialUser);
  const initialDataRef = useRef(initialArticles);
  const { data: userData = initialUser, mutate } = useSWR<FetchRV<UserObj>>(
    [getUserUrl(value), token],
    fetcher.get,
    {
      initialData: initialUserRef.current,
    }
  );
  const user = userData?.profile;
  if (initialUserRef.current) initialUserRef.current = undefined;
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
                {user.username !== currentUserName ? (
                  <UserSubscribeButton
                    token={token}
                    username={user.username}
                    follow={user.following}
                    mutate={mutate}
                  />
                ) : null}
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
        <AppBar position="static" color="default">
          <Tabs emptyType="author" url="/user/[value]" to={`/user/${value}`}>
            <Tab value={`author-${value}`} label="Last articles" />
            <Tab value={`favorited-${value}`} label="Favorite articles" />
          </Tabs>
        </AppBar>
        <ArticleList
          initialData={initialArticles}
          initialDataRef={initialDataRef}
          initialTab={initialTab}
          emptyType="author"
        />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { value, page: queryPage, type }: any = ctx.query;
    const { token } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const page = queryPage && +queryPage > 0 ? +queryPage - 1 : 0;
    const initialUser = await fetcher.get<FetchRV<UserObj>>(
      getUserUrl(value),
      token
    );
    const initialTab = {
      type: type === "favorited" ? type : "author",
      value,
    };
    const initialArticles = await fetcher.get<FetchRV<ArticlesObj>>(
      getArticlesUrl(initialTab.type, value, page),
      token
    );
    ctx.store.dispatch(setPageNumber(initialTab.type + "-" + value, page));
    return {
      props: {
        initialUser,
        initialArticles,
        initialTab,
      },
    };
  }
);

export default ArticlePage;
