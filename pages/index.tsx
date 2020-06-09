import { getArticleList } from "../src/redux/actions/article";
import { wrapper } from "../src/redux/store";
import { ThunkContext, StaticProps } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getAllArticles } from "../src/api/article";
import useSWR from "swr";
import Maybe from "../src/containers/common/Maybe";
import { NextPage } from "next";

const Index: NextPage<StaticProps<typeof getStaticProps>> = ({
  initialArticles,
}) => {
  const { data: allArticles, error } = useSWR([1], getAllArticles, {
    initialData: initialArticles,
  });
  return (
    <Maybe error={error} isLoading={!allArticles}>
      <ArticleList articles={allArticles.articles} />
    </Maybe>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store: { dispatch } }: ThunkContext) => {
    // await dispatch(getArticleList());
    const initialArticles = await getAllArticles(1);
    return { props: { initialArticles } };
  }
);

export default Index;
