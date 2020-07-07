import { ArticlesObj } from "../../types/article";
import { FC, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArticlePreview from "./ArticlePreview";
import { getArticlesUrl } from "../../api/article";
import { useSWRInfinite } from "swr";
import Pagination from "../common/Pagination";
import { useRouter } from "next/router";
import { FetchRV, State } from "../../types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import fetcher from "../../utils/fetcher";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.modal.open,
  (token, open) => ({ token, open })
);

type Props = {
  initialData?: FetchRV<ArticlesObj>[];
  type: string;
  value: string;
  initialPage?: number;
};

const ArticleList: FC<Props> = ({ initialData, type, value, initialPage }) => {
  const { token, open } = useSelector(selectData);
  const {
    query: { page: queryPage, ...query },
  } = useRouter();
  const startPage = queryPage
    ? +queryPage > 0
      ? +queryPage - 1
      : 0
    : initialPage;
  const { data, setSize, size, mutate } = useSWRInfinite<FetchRV<ArticlesObj>>(
    (index) => [getArticlesUrl(type, value, startPage + index, 20), token],
    fetcher.get,
    { initialData }
  );
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else if (!open) mutate();
  }, [open]);
  const articles =
    data?.length > 0 ? data.flatMap(({ articles }) => articles) : [];
  const articlesCount = data ? data[0]?.articlesCount : 0;
  const isLoadMoreUnavailable = articles?.length >= articlesCount;
  const isLoading = data?.length === 0 || data?.length !== size;
  const pageCount = Math.ceil(articlesCount / 20);
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
                setSize((x) => x + 1);
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
              page={size + startPage}
              count={pageCount}
              query={query}
              tabKey={type + "-" + value}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ArticleList;
