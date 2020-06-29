import { wrapper } from "../../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../../src/types";
import { getArticle } from "../../src/api/article";
import { NextPage } from "next";
import DefaultErrorPage from "next/error";
import Article from "../../src/containers/article/Article";
import { useRouter } from "next/router";
import { getArticleComments } from "../../src/api/comment";
import Grid from "@material-ui/core/Grid";

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
    <Grid container spacing={3}>
      <Article
        initialArticle={initialArticle}
        initialComments={initialComments}
        slug={slug ?? serverSlug}
      />
    </Grid>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }: ServerSideContext) => {
    const { slug }: any = query;
    const initialArticle = await getArticle(slug);
    const initialComments = await getArticleComments(slug);
    return {
      props: { serverSlug: slug, initialComments, initialArticle },
    };
  }
);

export default ArticlePage;
