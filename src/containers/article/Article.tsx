import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect } from "react";
import { CommentsObj } from "../../types/comment";
import GridDivider from "../../components/common/GridDivider";
import { FetchRV, State, ThunkDispatcher } from "../../types";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../../redux/modal/actions";
import CommentSection from "../comment/CommentSection";
import ArticleSection from "./ArticleSection";

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
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item container spacing={3}>
        <ArticleSection
          initialArticle={initialArticle}
          slug={slug}
          token={token}
          currentUserName={currentUserName}
        />
        <GridDivider item xs={12} />
        <CommentSection
          initialComments={initialComments}
          slug={slug}
          token={token}
          currentUserName={currentUserName}
        />
      </Grid>
    </Grid>
  );
};

export default Article;
