import { ArticleObj } from "@/types/article";
import { FC, memo } from "react";
import { CommentsObj } from "@/types/comment";
import { FetchRV, State } from "@/types";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import CommentSection from "../comment/CommentSection";
import ArticleSection from "./ArticleSection";
import Divider from "@material-ui/core/Divider";

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

const Article: FC<Props> = memo(({ initialArticle, initialComments, slug }) => {
  const { token, currentUserName } = useSelector(selectData);
  return (
    <>
      <ArticleSection
        initialArticle={initialArticle}
        slug={slug}
        token={token}
        currentUserName={currentUserName}
      />
      <Divider
        css={`
          width: 100%;
        `}
      />
      <CommentSection
        initialComments={initialComments}
        slug={slug}
        token={token}
        currentUserName={currentUserName}
      />
    </>
  );
});

export default Article;
