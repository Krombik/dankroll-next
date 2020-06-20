import { wrapper } from "../../src/redux/store";
import { ServerSideContext, PropsFromServer, FetchRV } from "../../src/types";
import { getArticleUrl } from "../../src/api/article";
import { NextPage } from "next";
import { fetcher } from "../../src/utils/fetcher";
import { ArticleObj } from "../../src/types/article";
import DefaultErrorPage from "next/error";
import Article from "../../src/containers/article/Article";
import { useRouter } from "next/router";
import { getArticleCommentsUrl } from "../../src/api/comment";
import { CommentsObj } from "../../src/types/comment";

const ArticlePage: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticle,
  serverSlug,
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
      slug={slug ?? serverSlug}
    />
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }: ServerSideContext) => {
    const { slug }: any = query;
    const initialArticle = await fetcher<FetchRV<ArticleObj>>(
      getArticleUrl(slug)
    );
    const initialComments = await fetcher<FetchRV<CommentsObj>>(
      getArticleCommentsUrl(slug)
    );
    return {
      props: { serverSlug: slug, initialComments, initialArticle },
    };
  }
);

export default ArticlePage;
