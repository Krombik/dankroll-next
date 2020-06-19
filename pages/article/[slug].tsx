import { wrapper } from "../../src/redux/store";
import { ServerSideContext } from "../../src/types";
import { getArticleUrl } from "../../src/api/article";
import { NextPage } from "next";
import { serverFetcher } from "../../src/utils/fetcher";
import { ArticleObj as ArticleType } from "../../src/types/article";
import DefaultErrorPage from "next/error";
import Article from "../../src/containers/article/Article";
import { useRouter } from "next/router";

type Props = {
  initialData?: ArticleType;
  status?: string;
  error?: string;
  serverSlug?: string;
};

const ArticlePage: NextPage<Props> = ({
  initialData,
  status,
  error,
  serverSlug,
}) => {
  const {
    query: { slug },
  }: any = useRouter();
  if (status) return <DefaultErrorPage statusCode={+status} title={error} />;
  return <Article initialData={initialData} slug={slug ?? serverSlug} />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }: ServerSideContext) => {
    const { slug }: any = query;
    try {
      const initialData = await serverFetcher<ArticleType>(getArticleUrl(slug));
      return {
        props: { initialData, serverSlug: slug },
      };
    } catch (error) {
      return { props: error.response.data };
    }
  }
);

export default ArticlePage;
