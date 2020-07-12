import { wrapper } from "../../src/redux/store";
import { ServerSideContext, PropsFromServer, FetchRV } from "../../src/types";
import { getArticleUrl } from "../../src/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import Article from "../../src/containers/article/Article";
import { useRouter } from "next/router";
import { getArticleCommentsUrl } from "../../src/api/comment";
import fetcher from "../../src/utils/fetcher";
import { ArticleObj } from "../../src/types/article";
import { CommentsObj } from "../../src/types/comment";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../../src/redux/common/actions";
import {
  setArticlesCountPerPage,
  serverSetArticlesCountPerPage,
} from "../../src/redux/articleTabs/actions";

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticle,
  initialComments,
}) => {
  if (initialArticle && initialArticle.error)
    return (
      <DefaultErrorPage
        statusCode={+initialArticle.status}
        title={initialArticle.error}
      />
    );
  const {
    query: { slug },
  }: any = useRouter();
  return (
    <Article
      initialArticle={initialArticle}
      initialComments={initialComments}
      slug={slug}
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { slug }: any = ctx.query;
    const { token, itemscount = 20 } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    ctx.store.dispatch(serverSetArticlesCountPerPage(+itemscount));
    const initialArticle = await fetcher.get<FetchRV<ArticleObj>>(
      getArticleUrl(slug),
      token
    );
    const initialComments = await fetcher.get<FetchRV<CommentsObj>>(
      getArticleCommentsUrl(slug),
      token
    );
    return {
      props: {
        initialComments,
        initialArticle,
      },
    };
  }
);

export default ArticlePage;
