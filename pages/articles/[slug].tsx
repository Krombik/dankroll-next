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
import { useRef } from "react";

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
  const initialArticleRef = useRef(initialArticle);
  const initialCommentsRef = useRef(initialComments);
  return (
    <Article
      initialArticle={initialArticle}
      initialArticleRef={initialArticleRef}
      initialComments={initialComments}
      initialCommentsRef={initialCommentsRef}
      slug={slug}
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx: ServerSideContext) => {
    const { slug }: any = ctx.query;
    const { token } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
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
