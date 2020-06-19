import { Article as ArticleType } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { getArticleUrl } from "../../api/article";
import ArticleHeader from "./ArticleHeader";

type Props = {
  initialData?: ArticleType;
  slug: string;
};

const Article: FC<Props> = ({ initialData, slug }) => {
  const {
    data: { article },
  } = useSWR<ArticleType>(getArticleUrl(slug), fetcher, {
    initialData,
  });
  return (
    <Grid container>
      <Grid item xs={12}>
        <ArticleHeader
          date={
            article.updatedAt === article.createdAt
              ? new Date(article.createdAt).toDateString()
              : new Date(article.updatedAt).toDateString().concat(" (Edited)")
          }
          title={article.title}
          favoritesCount={article.favoritesCount}
          isFavorite={article.favorited}
          tagList={article.tagList}
          avatar={article.author.image}
          username={article.author.username}
        />
        <Typography>{article.body}</Typography>
      </Grid>
    </Grid>
  );
};

export default Article;
