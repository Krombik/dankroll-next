import { wrapper } from "../../src/redux/store";
import { ServerSideContext, PropsFromServer, FetchRV } from "../../src/types";
import { getArticleUrl } from "../../src/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import Article from "../../src/containers/article/Article";
import { useRouter } from "next/router";
import { getArticleCommentsUrl } from "../../src/api/comment";
import Grid from "@material-ui/core/Grid";
import fetcher from "../../src/utils/fetcher";
import { ArticleObj } from "../../src/types/article";
import { CommentsObj } from "../../src/types/comment";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "../../src/redux/common/actions";

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
    <Grid container spacing={3}>
      <Article
        initialArticle={initialArticle}
        initialComments={initialComments}
        slug={slug}
      />
    </Grid>
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
