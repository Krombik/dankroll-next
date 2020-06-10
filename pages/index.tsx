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
  return <ArticleList initialData={[initialArticles]} />;
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store: { dispatch } }: ThunkContext) => {
    // await dispatch(getArticleList());
    const initialArticles = await getAllArticles(1);
    return { props: { initialArticles } };
  }
);

export default Index;
