import Link from "next/link";
import { AllArticles } from "../../types/article";
import { FC, memo } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArticlePreview from "./ArticlePreview";
import { getArticlesUrl } from "../../api/article";
import { useSWRInfinite } from "swr";
import { fetcher } from "../../utils/fetcher";

type Props = {
  initialData?: AllArticles[];
  type?: string;
  value?: string;
};

const ArticleList: FC<Props> = ({ initialData, type, value }) => {
  const { data: allArticles, error, setPage, page } = useSWRInfinite(
    (index, previousPageData) => {
      return previousPageData && previousPageData.articles.length !== 0
        ? getArticlesUrl({ page: index, type, value })
        : getArticlesUrl({ type, value });
    },
    fetcher,
    { initialData }
  );
  const isLoadMoreUnavailable = allArticles
    ? allArticles.reduce((prev, curr) => prev + curr.articles.length, 0) >=
      allArticles[0].articlesCount
    : false;
  const isLoading = allArticles?.length !== page || allArticles?.length === 0;
  return (
    <Grid container spacing={3}>
      {allArticles
        ?.flatMap(({ articles }) => articles)
        .map((article, index) => (
          <ArticlePreview key={index} article={article} />
        ))}
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
            ? "Loading..."
            : isLoadMoreUnavailable
            ? "No more Articles"
            : "Load more"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ArticleList;
