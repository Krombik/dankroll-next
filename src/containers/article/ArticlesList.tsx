import { ArticlesObj } from "../../types/article";
import { FC, useEffect, MutableRefObject } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArticlePreview from "./ArticlePreview";
import { getArticlesUrl, likeArticle } from "../../api/article";
import { useSWRInfinite } from "swr";
import Pagination from "../common/Pagination";
import { useRouter } from "next/router";
import { FetchRV, State } from "../../types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import fetcher from "../../utils/fetcher";
import usePrevious from "../../utils/usePrevious";
import useOnUpdateEffect from "../../utils/useOnUpdateEffect";
import ArticlePreviewSkeleton from "../../components/article/ArticlePreviewSkeleton";
import cloneDeep from "lodash.clonedeep";
import { TabType } from "../../types/tab";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.modal.open,
  (token, open) => ({ token, open })
);

type Props = {
  initialData: FetchRV<ArticlesObj>[];
  initialDataRef: MutableRefObject<FetchRV<ArticlesObj>[]>;
  initialTab: TabType;
  emptyType: string;
};

const ArticleList: FC<Props> = ({
  initialData,
  initialDataRef,
  initialTab,
  emptyType,
}) => {
  const { token, open } = useSelector(selectData);
  const {
    query: { page, ...query },
  } = useRouter();
  const { type = emptyType, value = "" }: any = query;
  const isInitial = initialTab.type === type && initialTab.value === value;
  const startPage = page && +page > 0 ? +page - 1 : 0;
  const {
    data = isInitial ? initialData : null,
    setSize,
    size = 1,
    mutate,
  } = useSWRInfinite<FetchRV<ArticlesObj>>(
    (index) => [getArticlesUrl(type, value, startPage + index, 20), token],
    fetcher.get,
    {
      initialData: isInitial ? initialDataRef.current : undefined,
    }
  );
  if (isInitial && initialDataRef.current) initialDataRef.current = undefined;
  const prevQuery = usePrevious(query);
  useEffect(() => {
    if (
      size > 1 &&
      prevQuery &&
      value === prevQuery.value &&
      type === prevQuery.type
    )
      setSize(1);
  }, [page]);
  useOnUpdateEffect(() => {
    if (!open) mutate();
  }, [open]);
  const articles =
    data?.length > 0 ? data.flatMap(({ articles }) => articles) : [];
  const articlesCount = data ? data[0]?.articlesCount : 0;
  const handleLike = async (liked: boolean, slug: string, index: number) => {
    const { article } = await likeArticle(!liked, slug, token);
    if (article) {
      const newData = cloneDeep(data);
      newData[Math.floor(index / 20)].articles[index % 20] = article;
      mutate(newData, false);
    }
  };
  const isLoadMoreUnavailable = articles?.length >= articlesCount;
  const isLoading = data?.length === 0 || data?.length !== size;
  const pageCount = Math.ceil(articlesCount / 20);
  return (
    <Grid container spacing={3}>
      {articles.map((article, index) => (
        <ArticlePreview
          key={index}
          article={article}
          onLike={handleLike}
          index={index}
        />
      ))}
      {isLoading
        ? Array.from(new Array(10)).map((_, index) => (
            <ArticlePreviewSkeleton key={index} />
          ))
        : !articlesCount
        ? "No articles available yet"
        : null}
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
