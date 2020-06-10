import Link from "next/link";
import { StyledArticlePreview, TagList } from "../../components/article/style";
import { ArticleType } from "../../types/article";
import { Grid } from "@material-ui/core";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

type Props = {
  article: ArticleType;
};

const ArticlePreview: FC<Props> = ({ article }) => (
  <Grid item xs={12} lg={6}>
    <StyledArticlePreview>
      <div>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={article.author.image}>
              {article.author.username[0]}
            </Avatar>
          }
          action={
            <Button
              variant="outlined"
              color="primary"
              endIcon={<FavoriteIcon />}
            >
              {article.favoritesCount}
            </Button>
          }
          title={article.author.username}
          subheader={
            article.updatedAt !== article.createdAt
              ? new Date(article.updatedAt).toDateString().concat(" (Edited)")
              : new Date(article.createdAt).toDateString()
          }
        />
        <CardContent>
          <Typography variant="h5">{article.title}</Typography>
          <Typography variant="subtitle1">{article.description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Read more
          </Button>
        </CardActions>
      </div>
      {article.tagList.length > 0 && (
        <TagList>
          {article.tagList.map((tag, index) => (
            <Chip
              label={"#" + tag}
              variant="outlined"
              component="li"
              key={index}
            />
          ))}
        </TagList>
      )}
    </StyledArticlePreview>
  </Grid>
);

export default ArticlePreview;
