import { wrapper } from "../../src/redux/store";
import { ServerSideContext, PropsFromServer } from "../../src/types";
import { getArticleUrl } from "../../src/api/article";
import { NextPage } from "next";
import { serverFetcher } from "../../src/utils/fetcher";

const Article: NextPage<PropsFromServer<typeof getServerSideProps>> = ({
  initialArticle,
}) => {
  console.log(initialArticle);
  return <pre>234</pre>;
};
export const getServerSideProps = wrapper.getServerSideProps(
  async ({ query }: ServerSideContext) => {
    const { slug }: any = query;
    const initialArticle = slug
      ? await serverFetcher(getArticleUrl(slug))
      : undefined;
    return {
      props: {
        initialArticle,
      },
    };
  }
);

export default Article;
