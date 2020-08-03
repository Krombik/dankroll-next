import { wrapper } from "@/redux/store";
import { ServerSideContext, PropsFromServer } from "@/types";
import { getArticleUrl } from "@/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import Article from "@/containers/article/Article";
import { useRouter } from "next/router";
import { getArticleCommentsUrl } from "@/api/comment";
import fetcher from "@/utils/fetcher";
import { ArticleObj } from "@/types/article";
import { CommentsObj } from "@/types/comment";
import { parseCookies } from "nookies";
import { serverSetAuthorized } from "@/redux/authentication/actions";
import { serverSetOffset } from "@/redux/articleTabs/actions";

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticle,
  initialComments,
}) => {
  if (initialArticle.status && !initialArticle.article)
    return <DefaultErrorPage statusCode={initialArticle.status} />;
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
    const { token, offset = 20 } = parseCookies(ctx);
    if (token) await ctx.store.dispatch(serverSetAuthorized(token));
    ctx.store.dispatch(serverSetOffset(+offset));
    const initialArticle = await fetcher.get<ArticleObj>(
      getArticleUrl(slug),
      token
    );
    const initialComments = await fetcher.get<CommentsObj>(
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
