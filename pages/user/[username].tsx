import { wrapper } from "../../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../../src/types";
import { getArticlesUrl } from "../../src/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import { getUserUrl } from "../../src/api/user";
import Grid from "@material-ui/core/Grid";
import ArticleList from "../../src/containers/article/ArticlesList";
import {
  serverSetOffset,
  setPageNumber,
} from "../../src/redux/articleTabs/actions";
import { ArticlesObj } from "../../src/types/article";
import fetcher from "../../src/utils/fetcher";
import { UserObj } from "../../src/types/user";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../../src/redux/authentication/actions";
import Tabs from "../../src/containers/tabs/Tabs";
import UserSection from "../../src/containers/user/UserSection";
import { TabValues } from "../../src/utils/constant";

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialUser,
  initialArticles,
  initialTab,
}) => {
  if (initialUser.status && !initialUser.profile)
    return <DefaultErrorPage statusCode={initialUser.status} />;
  const {
    query: { username },
  }: any = useRouter();
  return (
    <Grid container spacing={3}>
      <UserSection initialUser={initialUser} username={username} />
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs emptyType={TabValues.AUTHOR}>
            <Tab value={TabValues.AUTHOR} label="Last articles" />
            <Tab value={TabValues.FAVORITED} label="Favorite articles" />
          </Tabs>
        </AppBar>
        <ArticleList
          initialData={initialArticles}
          initialTab={initialTab}
          valueKey="username"
          emptyType={TabValues.AUTHOR}
        />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { username, page, type }: any = ctx.query;
    const { token, offset = 20 } = parseCookies(ctx);
    if (type && type !== TabValues.FAVORITED) {
      ctx.res
        .writeHead(301, { Location: `/user/${decodeURIComponent(username)}/` })
        .end();
      return null;
    }
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const initialPage = page && +page > 0 ? +page - 1 : 0;
    const initialUser = await fetcher.get<UserObj>(getUserUrl(username), token);
    const initialTab = {
      type: type || TabValues.AUTHOR,
      value: username,
    };
    const initialArticles = await fetcher.get<ArticlesObj>(
      getArticlesUrl(initialTab.type, username, initialPage, +offset),
      token
    );
    if (initialPage)
      ctx.store.dispatch(
        setPageNumber({ [initialTab.type + "-" + username]: initialPage })
      );
    ctx.store.dispatch(serverSetOffset(+offset));
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
