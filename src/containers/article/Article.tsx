import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { getArticleUrl } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Comments from "../common/Comments";
import { CommentsObj } from "../../types/comment";
import GridDivider from "../../components/common/GridDivider";
import Markdown from "react-markdown";
import { Link, Divider } from "@material-ui/core";
import { getArticleCommentsUrl } from "../../api/comment";
import Typography from "@material-ui/core/Typography";
import { FetchRV } from "../../types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Spinner from "../../components/common/Spinner";

type Props = {
  initialArticle?: FetchRV<ArticleObj>;
  initialComments?: FetchRV<CommentsObj>;
  slug: string;
};

const Article: FC<Props> = ({ initialArticle, initialComments, slug }) => {
  const { data: articleData } = useSWR<FetchRV<ArticleObj>>(
    getArticleUrl(slug),
    fetcher,
    {
      initialData: initialArticle,
    }
  );
  const { data: commentsData } = useSWR<FetchRV<CommentsObj>>(
    getArticleCommentsUrl(slug),
    fetcher,
    {
      initialData: initialComments,
    }
  );
  const article = articleData?.article;
  const comments = commentsData?.comments;
  return (
    <Grid container spacing={3}>
      {article ? (
        <>
          <Grid item xs={12}>
            <ArticleHeader
              date={
                article.updatedAt === article.createdAt
                  ? article.createdAt
                  : article.updatedAt
              }
              title={article.title}
              favoritesCount={article.favoritesCount}
              isFavorite={article.favorited}
              tagList={article.tagList}
              avatar={article.author.image}
              username={article.author.username}
            />
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
          {comments.length > 0 && (
            <Grid item xs={12} container spacing={3}>
              <Comments comments={comments} />
            </Grid>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Grid>
  );
};

export default Article;
