import { StyledArticlePreview } from "../../components/article/styled";
import { ArticleType } from "../../types/article";
import { Grid } from "@material-ui/core";
import { FC } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Skeleton from "@material-ui/lab/Skeleton";
import TagList from "../tag/TagList";
import ContentInfo from "../../components/common/ContentInfo";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setModal } from "../../redux/modal/actions";

type Props = {
  article?: ArticleType;
};

const ArticlePreview: FC<Props> = ({ article }) => {
  const content = article
    ? {
        avatar: article.author.image,
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
  const handleModalOpen = () => {
    dispatch(setModal(true, "article", article.slug));
    window.history.pushState("", "", `/articles/${article.slug}`);
  };
  return (
    <Grid item xs={12} lg={6}>
      <StyledArticlePreview>
        <div>
          <ContentInfo
            avatar={content.avatar}
            username={content.author}
            date={content.date}
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
          />
          <CardContent>
            <Typography variant="h5">{content.title}</Typography>
            <Typography variant="subtitle1">{content.about}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              disabled={!article}
              color="primary"
              onClick={handleModalOpen}
            >
              Read more
            </Button>
          </CardActions>
        </div>
        {article?.tagList.length > 0 && <TagList tagList={article.tagList} />}
      </StyledArticlePreview>
    </Grid>
  );
};

export default ArticlePreview;
