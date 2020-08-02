import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect } from "react";
import { CommentsObj } from "../../types/comment";
import { FetchRV, State, ThunkDispatcher } from "../../types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../redux/modal/actions";
import CommentSection from "../comment/CommentSection";
import ArticleSection from "./ArticleSection";
import { Divider } from "@material-ui/core";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.authentication.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

type Props = {
  initialArticle?: FetchRV<ArticleObj>;
  initialComments?: FetchRV<CommentsObj>;
  slug: string;
};

const Article: FC<Props> = ({ initialArticle, initialComments, slug }) => {
  const { token, currentUserName } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    const handleRouteChange = () => {
      if (!window.location.pathname.includes("/articles/"))
        dispatch(setModal(false));
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);
  return (
    <>
      <ArticleSection
        initialArticle={initialArticle}
        slug={slug}
        token={token}
        currentUserName={currentUserName}
      />
      <Grid
        item
        xs={12}
        css={`
          padding-top: 0 !important;
        `}
      >
        <Divider />
      </Grid>
      <CommentSection
        initialComments={initialComments}
        slug={slug}
        token={token}
        currentUserName={currentUserName}
      />
    </>
  );
};

export default Article;
