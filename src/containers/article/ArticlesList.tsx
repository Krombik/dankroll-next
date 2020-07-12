import { ArticlesObj } from "../../types/article";
import { FC, useEffect, useCallback, useRef, memo } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { getArticlesUrl } from "../../api/article";
import Pagination from "../common/Pagination";
import Router, { useRouter } from "next/router";
import { FetchRV, State, ThunkDispatcher } from "../../types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "../../utils/fetcher";
import usePrevious from "../../utils/usePrevious";
import useOnUpdateEffect from "../../utils/useOnUpdateEffect";
import { TabType } from "../../types/tab";
import { setModal } from "../../redux/modal/actions";
import { useInitialSWRInfinity } from "../../utils/useInitialSWR";
import ArticlePreviewSection from "./ArticlePreviewSection";
import ArticlePreviewSkeletonSection from "./ArticlePreviewSkeletonSection";

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

const ArticleList: FC<Props> = memo(
  ({ initialData, initialTab, emptyType }) => {
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
      size,
      mutate,
    } = useInitialSWRInfinity<FetchRV<ArticlesObj>>(
      (index) => [getArticlesUrl(type, value, startPage + index, 20), token],
      fetcher.get,
      initialData
    );
    const loadMore = () => {
      setSize((x) => x + 1);
    };
    const prevQuery = usePrevious(query);
    useEffect(() => {
      if (size === 1 && data?.length > 1) setSize(data.length);
    }, [type, value]);
    const ref = useRef(0);
    ref.current++;
    console.log(ref.current);
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
    const isLoadMoreUnavailable = data?.length * 20 >= articlesCount;
    const isLoading = data?.length === 0 || data?.length !== size;
    const pageCount = Math.ceil(articlesCount / 20);
    return (
      <Grid container spacing={3}>
        {data && (
          <ArticlePreviewSection data={data} token={token} mutate={mutate} />
        )}
        {isLoading ? (
          <ArticlePreviewSkeletonSection count={20} />
        ) : !articlesCount ? (
          "No articles available yet"
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
                tabKey={type + "-" + value}
              />
            </Grid>
          </>
        )}
      </Grid>
    );
  }
);

export default ArticleList;
