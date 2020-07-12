import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect, MutableRefObject } from "react";
import useSWR from "swr";
import { getArticleUrl, likeArticle } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Comments from "../comment/Comments";
import PostComment from "../comment/PostComment";
import { CommentsObj } from "../../types/comment";
import GridDivider from "../../components/common/GridDivider";
import Markdown from "react-markdown";
import { Link, Divider } from "@material-ui/core";
import { getArticleCommentsUrl } from "../../api/comment";
import Typography from "@material-ui/core/Typography";
import { FetchRV, State, ThunkDispatcher } from "../../types";
import Spinner from "../../components/common/Spinner";
import Banner from "../common/Banner";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import fetcher from "../../utils/fetcher";
import ArticleControlButtons from "./ArticleControlButtons";
import Badge from "@material-ui/core/Badge";
import { StyledSwitchableIcon } from "../../components/article/styled";
import { setModal } from "../../redux/modal/actions";
import BannerButton from "../../components/common/BannerButton";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import CommentSection from "../comment/CommentSection";
import { useInitialSWR } from "../../utils/useInitialSWR";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.common.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

type Props = {
  initialArticle?: FetchRV<ArticleObj>;
  initialComments?: FetchRV<CommentsObj>;
  slug: string;
};

const Article: FC<Props> = ({ initialArticle, initialComments, slug }) => {
  const { token, currentUserName } = useSelector(selectData);
  const { data: articleData = initialArticle, mutate } = useInitialSWR<
    FetchRV<ArticleObj>
  >([getArticleUrl(slug), token], fetcher.get, initialArticle);
  const handleLike = async () => {
    const data = await likeArticle(!article.favorited, slug, token);
    if (data.article) mutate(data, false);
  };
  const article = articleData?.article;
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    const handleRouteChange = () => {
      if (!window.location.pathname.includes("/articles/"))
        dispatch(setModal(false));
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);
  return (
    <Grid container justify="center" alignItems="center" spacing={3}>
      <Grid item container spacing={3}>
        {article ? (
          <>
            <Grid item xs={12}>
              <Banner>
                <ArticleHeader
                  article={article}
                  controlButtons={
                    <>
                      <BannerButton
                        tooltip={article.favorited ? "Dislike" : "Like"}
                        disabled={!currentUserName}
                        onClick={handleLike}
                      >
                        <Badge
                          badgeContent={article.favoritesCount}
                          color="primary"
                          overlap="circle"
                          showZero
                        >
                          <StyledSwitchableIcon
                            fontSize="inherit"
                            color="inherit"
                            active={article.favorited}
                            Icon={FavoriteTwoToneIcon}
                          />
                        </Badge>
                      </BannerButton>
                      {currentUserName === article.author.username && (
                        <ArticleControlButtons
                          slug={article.slug}
                          token={token}
                        />
                      )}
                    </>
                  }
                />
              </Banner>
            </Grid>
            <Grid item xs={12}>
              <Markdown
                source={article.body}
                skipHtml={true}
                renderers={{
                  link: Link,
                  thematicBreak: Divider,
                }}
              />
            </Grid>
          </>
        ) : (
          <Spinner />
        )}
        <GridDivider item xs={12} />
        <CommentSection
          initialComments={initialComments}
          slug={slug}
          token={token}
          currentUserName={currentUserName}
        />
      </Grid>
    </Grid>
  );
};

export default Article;
