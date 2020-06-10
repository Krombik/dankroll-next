import Link from "next/link";
import { StyledArticlePreview, TagList } from "../../components/article/style";
import { ArticleType } from "../../types/article";
import { Grid } from "@material-ui/core";
import { FC } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";

type Props = {
  article?: ArticleType;
};

const ArticlePreview: FC<Props> = ({ article }) => {
  const content = article
    ? {
        avatar: (
          <Avatar aria-label="recipe" src={article.author.image}>
            {article.author.username[0]}
          </Avatar>
        ),
        like: article.favoritesCount,
        author: article.author.username,
        date:
          article.updatedAt !== article.createdAt
            ? new Date(article.updatedAt).toDateString().concat(" (Edited)")
            : new Date(article.createdAt).toDateString(),
        title: article.title,
        about: article.description,
      }
    : {
        avatar: (
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
        ),
        like: "?",
        author: <Skeleton animation="wave" width="30%" />,
        date: <Skeleton animation="wave" width="40%" />,
        title: <Skeleton animation="wave" width="70%" />,
        about: (
          <>
            <Skeleton animation="wave" height={16} width="100%" />
            <Skeleton animation="wave" height={16} width="100%" />
            <Skeleton animation="wave" height={16} width="80%" />
          </>
        ),
      };
  return (
    <Grid item xs={12} lg={6}>
      <StyledArticlePreview>
        <div>
          <CardHeader
            avatar={content.avatar}
            action={
              <Button
                variant="outlined"
                color="primary"
                disabled={!article}
                endIcon={<FavoriteIcon />}
              >
                {content.like}
              </Button>
            }
            title={content.author}
            subheader={content.date}
          />
          <CardContent>
            <Typography variant="h5">{content.title}</Typography>
            <Typography variant="subtitle1">{content.about}</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" disabled={!article} color="primary">
              Read more
            </Button>
          </CardActions>
        </div>
        {article?.tagList.length > 0 && (
          <TagList>
            {article.tagList.map((tag, index) => (
              <Chip
                label={"#" + tag}
                variant="outlined"
                size="small"
                component="li"
                key={index}
              />
            ))}
          </TagList>
        )}
      </StyledArticlePreview>
    </Grid>
  );
};

export default ArticlePreview;
