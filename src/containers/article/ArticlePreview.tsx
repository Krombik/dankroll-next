import Link from "next/link";
import { StyledArticlePreview } from "../../components/article/styled";
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
import Skeleton from "@material-ui/lab/Skeleton";
import TagList from "../common/TagList";
import ContentInfo from "../../components/common/ContentInfo";

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
            ? article.createdAt
            : article.updatedAt,
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
            <Link as={`/article/${article?.slug}`} href={"/article/[slug]"}>
              <Button variant="contained" disabled={!article} color="primary">
                Read more
              </Button>
            </Link>
          </CardActions>
        </div>
        {article?.tagList.length > 0 && <TagList tagList={article.tagList} />}
      </StyledArticlePreview>
    </Grid>
  );
};

export default ArticlePreview;
