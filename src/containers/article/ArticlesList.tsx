import { ArticlesObj } from "@/types/article";
import { FC, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getArticlesUrl } from "@/api/article";
import Pagination from "../common/Pagination";
import Router, { useRouter } from "next/router";
import { FetchRV, State, ThunkDispatcher } from "@/types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import usePrevious from "@/utils/usePrevious";
import { TabQuery } from "@/types/tab";
import { setModal, setArticleListRefreshFunc } from "@/redux/modal/actions";
import { useRequestInfinity } from "@/utils/useRequest";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";
import Typography from "@material-ui/core/Typography";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.articleTabs.offset,
  (token, offset) => ({ token, offset })
);

type Props = {
  initialData: FetchRV<ArticlesObj>;
  initialTab: TabQuery;
  emptyType: string;
  valueKey: string;
};

const ArticleList: FC<Props> = ({
  initialData,
  initialTab,
  emptyType,
  valueKey,
}) => {
  const { token, offset } = useSelector(selectData);
  const {
    query: { page, ...query },
  } = useRouter();
  const dispatch = useDispatch<ThunkDispatcher>();
  const prevQuery = usePrevious(query);
  const { type = emptyType, [valueKey]: value }: any = query;
  const isInitial = initialTab.type === type && initialTab.value === value;
  const startPage = page && +page > 0 ? +page - 1 : 0;
  const {
    data = isInitial && initialData ? [initialData] : null,
    setSize,
    size,
    mutate,
  } = useRequestInfinity<ArticlesObj>(
    (index) => [getArticlesUrl(type, value, startPage + index, offset), token],
    initialData
  );
  useEffect(() => {
    if (setSize && data && size === 1 && data.length > 1) setSize(data.length);
  }, [type, value]);
  useEffect(() => {
    if (
      setSize &&
      (size || 0 > 1) &&
      prevQuery &&
      value === prevQuery.value &&
      type === prevQuery.type
    )
      setSize(1);
  }, [page]);
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
    dispatch(setArticleListRefreshFunc(mutate));
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);
  if (!data || !size || !setSize)
    return <ArticlePreviewSkeletonSection count={offset} />;
  const articlesCount = data[0]?.articlesCount as number;
  if (data[0] && !articlesCount)
    return (
      <Grid item xs={12}>
        <Typography align="center">No articles available</Typography>
      </Grid>
    );
  const loadMore = () => {
    setSize((x) => x + 1);
  };
  const isLoadMoreUnavailable = data.length * offset >= articlesCount;
  const isLoading = data.length !== size;
  const pageCount = Math.ceil(articlesCount / offset);
  return (
    <>
      <ArticlePreviewSection
        data={data}
        token={token}
        mutate={mutate}
        offset={offset}
      />
      {isLoading && <ArticlePreviewSkeletonSection count={offset} />}
      {pageCount > 1 && (
        <>
          <Grid container item justify="center">
            <Button
              onClick={loadMore}
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
              tabKey={type + (value ? "-" + value : "")}
            />
          </Grid>
        </>
      )}
    </>
  );
};
export default ArticleList;
