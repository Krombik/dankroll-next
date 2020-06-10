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
  return (
    <Grid container spacing={3}>
      <Maybe error={error} isLoading={allArticles.length === 0}>
        {allArticles?.map(({ articles }, i) =>
          articles.map((article, j) => {
            return <ArticlePreview key={(i + 1) * (j + 1)} article={article} />;
          })
        )}
        {allArticles.length !== page && <div>Loading</div>}
      </Maybe>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Load more
      </button>
    </Grid>
  );
};

export default ArticleList;
