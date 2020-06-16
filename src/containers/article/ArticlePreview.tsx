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
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Chip from "@material-ui/core/Chip";
import Skeleton from "@material-ui/lab/Skeleton";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { addTab, setTab } from "../../redux/actions/article";
import Router from "next/router";

type Props = {
  article?: ArticleType;
};

const ArticlePreview: FC<Props> = ({ article }) => {
  const content = article
    ? {
        avatar: (
          <Avatar src={article.author.image}>
            {article.author.username[0]}
          </Avatar>
        ),
        like: article.favoritesCount,
        author: article.author.username,
        date:
          article.updatedAt === article.createdAt
            ? new Date(article.createdAt).toDateString()
            : new Date(article.updatedAt).toDateString().concat(" (Edited)"),
        title: article.title,
        about: article.description,
      }
    : {
        avatar: (
          <Skeleton animation={false} variant="circle">
            <Avatar />
          </Skeleton>
        ),
        like: "?",
        author: <Skeleton animation={false} width="30%" />,
        date: <Skeleton animation={false} width="40%" />,
        title: <Skeleton animation={false} width="70%" />,
        about: (
          <>
            <Skeleton animation={false} width="100%" />
            <Skeleton animation={false} width="95%" />
            <Skeleton animation={false} width="80%" />
          </>
        ),
      };
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleAddTag = (tag: string) => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    dispatch(addTab({ value: tag, type: "tag" }));
    Router.push(
      "/",
      {
        pathname: "/",
        query: { tag },
      },
      { shallow: true }
    );
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
                endIcon={
                  article?.favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
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
                onClick={() => {
                  handleAddTag(tag);
                }}
              />
            ))}
          </TagList>
        )}
      </StyledArticlePreview>
    </Grid>
  );
};

export default ArticlePreview;
