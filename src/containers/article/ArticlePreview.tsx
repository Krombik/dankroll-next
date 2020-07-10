import {
  StyledArticlePreview,
  StyledFavoriteTwoToneIcon,
} from "../../components/article/styled";
import { ArticleType } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import { FC, useState, useEffect } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TagList from "../tag/TagList";
import ContentInfo from "../../components/common/ContentInfo";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setModal } from "../../redux/modal/actions";
import { likeArticle } from "../../api/article";
import useOnUpdateEffect from "../../utils/useOnUpdateEffect";

type Props = {
  article: ArticleType;
  onLike: (liked: boolean, slug: string, index: number) => Promise<void>;
  index: number;
};

const ArticlePreview: FC<Props> = ({ article, onLike, index }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleModalOpen = () => {
    dispatch(setModal(true, "article", article.slug));
    window.history.pushState("", "", `/articles/${article.slug}`);
  };
  const handleLike = async () => {
    await onLike(article.favorited, article.slug, index);
  };
  return (
    <Grid item xs={12} lg={6}>
      <StyledArticlePreview>
        <div>
          <ContentInfo
            avatar={article.author.image}
            username={article.author.username}
            date={
              article.updatedAt === article.createdAt
                ? new Date(article.createdAt).toDateString()
                : new Date(article.updatedAt).toDateString().concat(" (Edited)")
            }
            action={
              <Tooltip
                title={article?.favorited ? "Dislike" : "Like"}
                disableHoverListener={!article}
              >
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!article}
                  onClick={handleLike}
                  endIcon={
                    <StyledFavoriteTwoToneIcon liked={article?.favorited} />
                  }
                >
                  {article.favoritesCount}
                </Button>
              </Tooltip>
            }
          />
          <CardContent>
            <Typography variant="h5">{article.title}</Typography>
            <Typography variant="subtitle1">{article.description}</Typography>
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
