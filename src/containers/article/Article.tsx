import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect } from "react";
import useSWR from "swr";
import { getArticleUrl } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Comments from "../common/Comments";
import { CommentsObj } from "../../types/comment";
import GridDivider from "../../components/common/GridDivider";
import Markdown from "react-markdown";
import { Link, Divider } from "@material-ui/core";
import { getArticleCommentsUrl } from "../../api/comment";
import Typography from "@material-ui/core/Typography";
import { FetchRV, State } from "../../types";
import Spinner from "../../components/common/Spinner";
import Banner from "../common/Banner";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import fetcher from "../../utils/fetcher";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.common.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

type Props = {
  initialArticle?: FetchRV<ArticleObj>;
  initialComments?: FetchRV<CommentsObj>;
  slug: string;
};

const Article: FC<Props> = ({ initialArticle, initialComments, slug }) => {
  const { token, currentUserName } = useSelector(selectData);
  const { data: articleData, mutate } = useSWR<FetchRV<ArticleObj>>(
    [getArticleUrl(slug), token],
    fetcher.get,
    {
      initialData: initialArticle,
    }
  );
  useEffect(() => {
    if (initialArticle) mutate(articleData, false);
  }, []);
  const { data: commentsData } = useSWR<FetchRV<CommentsObj>>(
    [getArticleCommentsUrl(slug), token],
    fetcher.get,
    {
      initialData: initialComments,
    }
  );
  const article = articleData?.article;
  const comments = commentsData?.comments;
  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item container spacing={3}>
        {article ? (
          <>
            <Grid item xs={12}>
              <Banner>
                <ArticleHeader
                  article={article}
                  isUserCurrent={currentUserName === article.author.username}
                />
              </Banner>
            </Grid>
            <Grid item xs={12}>
              <Markdown
                source={article.body}
                skipHtml={true}
                renderers={{
                  link: Link,
                  thematicBreak: Divider,
                }}
              />
            </Grid>
          </>
        ) : (
          <Spinner />
        )}
        <GridDivider item xs={12} />
        {comments ? (
          <>
            <Grid item xs={12}>
              <Typography variant="h4">Comments: {comments.length}</Typography>
            </Grid>
            {comments.length > 0 && <Comments comments={comments} />}
          </>
        ) : (
          <Spinner />
        )}
      </Grid>
    </Grid>
  );
};

export default Article;
