import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import useSWR from "swr";
import { getArticle } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Comments from "../common/Comments";
import { CommentsObj } from "../../types/comment";
import GridDivider from "../../components/common/GridDivider";
import Markdown from "react-markdown";
import { Link, Divider } from "@material-ui/core";
import { getArticleComments } from "../../api/comment";
import Typography from "@material-ui/core/Typography";
import { FetchRV, State } from "../../types";
import Spinner from "../../components/common/Spinner";
import Banner from "../common/Banner";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

const selectData = createSelector(
  (state: State) => state.common.token,
  (token) => ({ token })
);

type Props = {
  initialArticle?: FetchRV<ArticleObj>;
  initialComments?: FetchRV<CommentsObj>;
  slug: string;
};

const Article: FC<Props> = ({ initialArticle, initialComments, slug }) => {
  const { token } = useSelector(selectData);
  const { data: articleData } = useSWR([slug, token], getArticle, {
    initialData: initialArticle,
  });
  const { data: commentsData } = useSWR([slug, token], getArticleComments, {
    initialData: initialComments,
  });
  const article = articleData?.article;
  const comments = commentsData?.comments;
  return (
    <>
      {article ? (
        <>
          <Grid item xs={12}>
            <Banner>
              <ArticleHeader
                date={
                  article.updatedAt === article.createdAt
                    ? new Date(article.createdAt).toDateString()
                    : new Date(article.updatedAt)
                        .toDateString()
                        .concat(" (Edited)")
                }
                title={article.title}
                favoritesCount={article.favoritesCount}
                isFavorite={article.favorited}
                tagList={article.tagList}
                avatar={article.author.image}
                username={article.author.username}
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
    </>
  );
};

export default Article;
