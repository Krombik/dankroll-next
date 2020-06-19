import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { getArticleUrl } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Comments from "../common/Comments";
import { CommentsObj } from "../../types/comment";
import Divider from "@material-ui/core/Divider";
import GridDivider from "../../components/common/GridDivider";

type Props = {
  initialData?: ArticleObj;
  initialComments?: CommentsObj;
  slug: string;
};

const Article: FC<Props> = ({ initialData, initialComments, slug }) => {
  const {
    data: { article },
  } = useSWR<ArticleObj>(getArticleUrl(slug), fetcher, {
    initialData,
  });
  return (
    <Grid container spacing={3}>
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
        <Typography>{article.body}</Typography>
      </Grid>
      <GridDivider item xs={12} />
      <Grid item xs={12}>
        <Comments slug={slug} initialData={initialComments} />
      </Grid>
    </Grid>
  );
};

export default Article;
