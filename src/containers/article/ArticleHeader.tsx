import {
  StyledIconButton,
  StyledCardHeader,
} from "../../components/article/styled";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { FC, useMemo } from "react";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TagList from "../tag/TagList";
import ArticleControlButtons from "./ArticleControlButtons";
import { ArticleType } from "../../types/article";

type Props = {
  article: ArticleType;
  controlButtons: JSX.Element;
};

const ArticleHeader: FC<Props> = ({ article, controlButtons }) => {
  const date = useMemo(
    () =>
      article.updatedAt === article.createdAt
        ? new Date(article.createdAt).toDateString()
        : new Date(article.updatedAt).toDateString().concat(" (Edited)"),
    [article.updatedAt]
  );
  return (
    <>
      <Typography variant="h2" color="textPrimary">
        <Grid container>
          {article.title}
          {controlButtons}
        </Grid>
      </Typography>
      {article.tagList.length > 0 && <TagList tagList={article.tagList} />}
      <StyledCardHeader
        avatar={article.author.image}
        titleTypographyProps={{ color: "textPrimary" }}
        username={article.author.username}
        date={date}
      />
    </>
  );
};

export default ArticleHeader;
