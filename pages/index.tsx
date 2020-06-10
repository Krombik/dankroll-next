import { getArticleList } from "../src/redux/actions/article";
import { wrapper } from "../src/redux/store";
import { ThunkContext, StaticProps } from "../src/types";
import ArticleList from "../src/containers/article/ArticlesList";
import { getAllArticles } from "../src/api/article";
import useSWR, { useSWRInfinite } from "swr";
import Maybe from "../src/containers/common/Maybe";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Index: NextPage<StaticProps<typeof getStaticProps>> = ({
  initialArticles,
}) => {
  // const { data: allArticles, error } = useSWR([1], getAllArticles, {
  //   initialData: initialArticles,
  // });
  console.log("dratute");
  const { data: allArticles, error, setPage, page } = useSWRInfinite(
    (index, previousPageData) => {
      // reached the end
      if (previousPageData?.length === 0) return null;

      // API key
      return [index];
    },
    getAllArticles, // same as useSWR
    { initialData: [initialArticles] } // same as useSWR
  );
  return (
    <Maybe error={error} isLoading={!allArticles}>
      <ArticleList
        setPage={setPage}
        page={page}
        articles={allArticles.flat()}
      />
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
