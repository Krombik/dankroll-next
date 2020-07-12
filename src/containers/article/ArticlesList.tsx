import { ArticlesObj } from "../../types/article";
import { FC, useEffect, MouseEvent, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArticlePreview from "./ArticlePreview";
import { getArticlesUrl, likeArticle } from "../../api/article";
import Pagination from "../common/Pagination";
import Router, { useRouter } from "next/router";
import { FetchRV, State, ThunkDispatcher } from "../../types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "../../utils/fetcher";
import usePrevious from "../../utils/usePrevious";
import useOnUpdateEffect from "../../utils/useOnUpdateEffect";
import ArticlePreviewSkeleton from "../../components/article/ArticlePreviewSkeleton";
import cloneDeep from "lodash.clonedeep";
import { TabType } from "../../types/tab";
import { setModal } from "../../redux/modal/actions";
import { useInitialSWRInfinity } from "../../utils/useInitialSWR";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.modal.open,
  (token, open) => ({ token, open })
);

type Props = {
  initialData: FetchRV<ArticlesObj>;
  initialTab: TabType;
  emptyType: string;
};

const ArticleList: FC<Props> = ({ initialData, initialTab, emptyType }) => {
  const { token, open } = useSelector(selectData);
  const {
    query: { page, ...query },
  } = useRouter();
  const { type = emptyType, value = "" }: any = query;
  const isInitial = initialTab.type === type && initialTab.value === value;
  const startPage = page && +page > 0 ? +page - 1 : 0;
  const {
    data = isInitial && initialData ? [initialData] : null,
    setSize,
    size = 1,
    mutate,
  } = useInitialSWRInfinity<FetchRV<ArticlesObj>>(
    (index) => [getArticlesUrl(type, value, startPage + index, 20), token],
    fetcher.get,
    initialData
  );
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
  const handleLike = useCallback(
    async (liked: boolean, slug: string, index: number) => {
      const { article } = await likeArticle(!liked, slug, token);
      if (article) {
        const newData = cloneDeep(data);
        newData[Math.floor(index / 20)].articles[index % 20] = article;
        mutate(newData, false);
      }
    },
    [data]
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleModal = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const path = e.currentTarget.pathname;
    dispatch(setModal(true, "article", path.replace("/articles/", "")));
    window.history.pushState("", "", path);
  }, []);
  useEffect(() => {
    const handleRouteChange = async () => {
      const { pathname } = window.location;
      if (pathname.includes("/articles/")) {
        await Router.replace(
          { pathname: Router.pathname, query: Router.query },
          Router.asPath,
          { shallow: true }
        );
        window.history.replaceState("", "", pathname);
        dispatch(setModal(true));
      }
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);
  const isLoadMoreUnavailable = articles?.length >= articlesCount;
  const isLoading = data?.length === 0 || data?.length !== size;
  const pageCount = Math.ceil(articlesCount / 20);
  return (
    <Grid container spacing={3}>
      {articles.map((article, index) => (
        <ArticlePreview
          key={index}
          article={article}
          onLike={token ? handleLike : null}
          onModal={handleModal}
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
