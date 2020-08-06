import { wrapper } from "@/redux/store";
import { ServerSideContext, PropsFromServer } from "@/types";
import { getArticlesUrl } from "@/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import Tab from "@material-ui/core/Tab";
import { getUserUrl } from "@/api/user";
import ArticleList from "@/containers/article/ArticlesList";
import { serverSetOffset, setPageNumber } from "@/redux/articleTabs/actions";
import { ArticlesObj } from "@/types/article";
import fetcher from "@/utils/fetcher";
import { UserObj } from "@/types/user";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "@/redux/authentication/actions";
import Tabs from "@/containers/tabs/Tabs";
import UserSection from "@/containers/user/UserSection";
import { TabValues } from "@/utils/constant";
import TabBar from "@/components/tabs/TabBar";
import Gutter from "@/components/common/Gutter";
import { memo } from "react";

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = memo(
  ({ initialUser, initialArticles, initialTab }) =>
    initialUser.status && !initialUser.profile ? (
      <DefaultErrorPage statusCode={initialUser.status} />
    ) : (
      <>
        <UserSection initialUser={initialUser} />
        <TabBar>
          <Tabs emptyType={TabValues.AUTHOR}>
            <Tab value={TabValues.AUTHOR} label="Last articles" />
            <Tab value={TabValues.FAVORITED} label="Favorite articles" />
          </Tabs>
        </TabBar>
        <Gutter>
          <ArticleList
            initialData={initialArticles}
            initialTab={initialTab}
            valueKey="username"
            emptyType={TabValues.AUTHOR}
          />
        </Gutter>
      </>
    )
);

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
