import Link from "next/link";
import { AllArticles } from "../../types/article";
import { FC, memo } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArticlePreview from "./ArticlePreview";
import { getArticlesUrl } from "../../api/article";
import { useSWRInfinite } from "swr";
import { fetcher } from "../../utils/fetcher";
import Pagination from "../common/Pagination";
import { useRouter } from "next/router";

type Props = {
  initialData?: AllArticles[];
  type: string;
  value: string;
  initialPage?: number;
};

const ArticleList: FC<Props> = ({ initialData, type, value, initialPage }) => {
  const {
    query: { page: queryPage },
  } = useRouter();
  const startPage = queryPage
    ? +queryPage > 0
      ? +queryPage - 1
      : 0
    : initialPage;
  const { data, error, setPage, page, mutate } = useSWRInfinite(
    (index, previousPageData) =>
      previousPageData && previousPageData.articles.length !== 0
        ? getArticlesUrl({ page: startPage + index, type, value })
        : getArticlesUrl({ page: startPage, type, value }),
    fetcher,
    { initialData }
  );
  const articles =
    data?.length > 0 ? data.flatMap(({ articles }) => articles) : [];
  const articlesCount = data ? data[0]?.articlesCount : 0;
  const isLoadMoreUnavailable = articles?.length >= articlesCount;
  const isLoading = data?.length === 0 || data?.length !== page;
  const pageCount = Math.ceil(articlesCount / 10);
  const resetPage = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    mutate([]);
    setPage(1);
  };
  return (
    <Grid container spacing={3}>
      {articles?.map((article, index) => (
        <ArticlePreview key={index} article={article} />
      ))}
      {isLoading
        ? Array.from(new Array(10)).map((_, index) => (
            <ArticlePreview key={index} />
          ))
        : !articlesCount
        ? "No articles available yet"
        : ""}
      {pageCount > 1 && (
        <>
          <Grid container item justify="center">
            <Button
              onClick={() => {
                setPage((x) => x + 1);
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
          <Grid container item justify="center">
            <Pagination
              page={page + startPage}
              count={pageCount}
              tabKey={type + "-" + value}
              resetPage={resetPage}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ArticleList;
