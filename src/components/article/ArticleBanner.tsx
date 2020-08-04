import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import TagList from "@/containers/tag/TagList";
import { ArticleType } from "@/types/article";
import Banner from "@/containers/common/Banner";
import ContentInfo from "@/containers/common/ContentInfo";

type Props = {
  article: ArticleType;
  controlButtons: JSX.Element;
};

const ArticleBanner: FC<Props> = ({ article, controlButtons }) => (
  <Banner>
    <Grid
      item
      container
      alignItems="center"
      component={Typography}
      variant="h2"
      color="textPrimary"
    >
      <Grid item>{article.title}</Grid>
      {controlButtons}
    </Grid>
    {article.tagList.length > 0 && (
      <Grid item container spacing={1}>
        <TagList tagList={article.tagList} />
      </Grid>
    )}
    <Grid
      item
      component={ContentInfo}
      avatar={article.author.image}
      titleTypographyProps={{ color: "textPrimary" }}
      username={article.author.username}
      date={
        article.updatedAt === article.createdAt
          ? new Date(article.createdAt).toDateString()
          : new Date(article.updatedAt).toDateString().concat(" (Edited)")
      }
    ></Grid>
  </Banner>
);

export default ArticleBanner;
