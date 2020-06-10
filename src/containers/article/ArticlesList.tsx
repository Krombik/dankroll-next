import Link from "next/link";
import { AllArticles } from "../../types/article";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, FC } from "react";
import { createSelector } from "reselect";
import { Grid, Paper, Button } from "@material-ui/core";
import ArticlePreview from "./ArticlePreview";
import Maybe from "../common/Maybe";
import { getAllArticles } from "../../api/article";
import { useSWRInfinite } from "swr";

// const selectData = createSelector(
//   (state: State) => state.article.articles,
//   (articles) => ({ articles })
// );

type Props = {
  initialData: AllArticles[];
};

const ArticleList: FC<Props> = ({ initialData }) => {
  const { data: allArticles, error, setPage, page } = useSWRInfinite(
    (index, previousPageData) => {
      return previousPageData && previousPageData.articles.length !== 0
        ? [index + 1]
        : [1];
    },
    getAllArticles,
    { initialData }
  );
  const isLoadMoreUnavailable =
    allArticles.reduce((prev, curr) => prev + curr.articles.length, 0) >
    allArticles[0].articlesCount;
  const isLoading = allArticles.length !== page || allArticles.length === 0;
  return (
    <Grid container spacing={3}>
      {allArticles?.map(({ articles }, i) =>
        articles.map((article, j) => (
          <ArticlePreview key={(i + 1) * (j + 1)} article={article} />
        ))
      )}
      {isLoading &&
        Array.from(new Array(10)).map((_, index) => (
          <ArticlePreview key={index} />
        ))}
      <Grid container item justify="center">
        <Button
          onClick={() => {
            setPage(page + 1);
          }}
          variant="contained"
          color="primary"
          disabled={isLoading || isLoadMoreUnavailable}
        >
          {isLoading
            ? "Loading"
            : isLoadMoreUnavailable
            ? "No more Articles"
            : "Load more"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ArticleList;
