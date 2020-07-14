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
  setPageNumber,
  serverSetArticlesCountPerPage,
} from "../../src/redux/articleTabs/actions";
import { ArticlesObj } from "../../src/types/article";
import fetcher from "../../src/utils/fetcher";
import { UserObj } from "../../src/types/user";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../../src/redux/common/actions";
import Tabs from "../../src/containers/tabs/Tabs";
import UserSection from "../../src/containers/user/UserSection";

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialUser,
  initialArticles,
  initialTab,
}) => {
  if (initialUser.status && !initialUser.profile)
    return <DefaultErrorPage statusCode={initialUser.status} />;
  const {
    query: { value },
  }: any = useRouter();
  return (
    <Grid container spacing={3}>
      <UserSection initialUser={initialUser} username={value} />
      <Grid item xs={12}>
        <AppBar position="static" color="default">
          <Tabs emptyType="author" url="/user/[value]" to={`/user/${value}`}>
            <Tab value={`author-${value}`} label="Last articles" />
            <Tab value={`favorited-${value}`} label="Favorite articles" />
          </Tabs>
        </AppBar>
        <ArticleList
          initialData={initialArticles}
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
    const { token, itemscount = 20 } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    const page = queryPage && +queryPage > 0 ? +queryPage - 1 : 0;
    const initialUser = await fetcher.get<UserObj>(getUserUrl(value), token);
    const initialTab = {
      type: type === "favorited" ? type : "author",
      value,
    };
    const initialArticles = await fetcher.get<ArticlesObj>(
      getArticlesUrl(initialTab.type, value, page, +itemscount),
      token
    );
    ctx.store.dispatch(setPageNumber(initialTab.type + "-" + value, page));
    ctx.store.dispatch(serverSetArticlesCountPerPage(+itemscount));
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
