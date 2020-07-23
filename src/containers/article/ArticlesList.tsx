import { ArticlesObj } from "../../types/article";
import { FC, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getArticlesUrl } from "../../api/article";
import Pagination from "../common/Pagination";
import Router, { useRouter } from "next/router";
import { FetchRV, State, ThunkDispatcher } from "../../types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import usePrevious from "../../utils/usePrevious";
import useOnUpdateEffect from "../../utils/useOnUpdateEffect";
import { TabQuery } from "../../types/tab";
import { setModal } from "../../redux/modal/actions";
import { useRequestInfinity } from "../../utils/useRequest";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";
import Typography from "@material-ui/core/Typography";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.modal.open,
  (state: State) => state.articleTabs.offset,
  (token, open, offset) => ({ token, open, offset })
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
  const { token, open, offset } = useSelector(selectData);
  const {
    query: { page, ...query },
  } = useRouter();
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
  const loadMore = () => {
    setSize((x) => x + 1);
  };
  const prevQuery = usePrevious(query);
  useEffect(() => {
    if (size === 1 && data?.length > 1) setSize(data.length);
  }, [type, value]);
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
  const dispatch = useDispatch<ThunkDispatcher>();
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
  const articlesCount = data ? data[0]?.articlesCount : 0;
  const isLoadMoreUnavailable = data?.length * offset >= articlesCount;
  const isLoading = data?.length === 0 || data?.length !== size;
  const pageCount = Math.ceil(articlesCount / offset);
  return (
    <>
      {data && (
        <ArticlePreviewSection
          data={data}
          token={token}
          mutate={mutate}
          offset={offset}
        />
      )}
      {isLoading ? (
        <ArticlePreviewSkeletonSection count={offset} />
      ) : !articlesCount ? (
        <Grid item xs={12}>
          <Typography align="center">No articles available</Typography>
        </Grid>
      ) : null}
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
