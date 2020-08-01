import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC, useEffect } from "react";
import { getArticleUrl } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Markdown from "react-markdown";
import { Link, Divider } from "@material-ui/core";
import { FetchRV, ThunkDispatcher } from "../../types";
import Spinner from "../../components/common/Spinner";
import Banner from "../common/Banner";
import ArticleControlButtons from "./ArticleControlButtons";
import { useRequest } from "../../utils/useRequest";
import ArticleLikeButton from "./ArticleLikeButton";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/error/actions";

type Props = {
  initialArticle?: FetchRV<ArticleObj>;
  slug: string;
  token: string;
  currentUserName: string;
};

const ArticleSection: FC<Props> = ({
  initialArticle,
  slug,
  token,
  currentUserName,
}) => {
  const { data = initialArticle, mutate } = useRequest<ArticleObj>(
    [getArticleUrl(slug), token],
    initialArticle
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data));
  });
  if (!data) return <Spinner />;
  const { article } = data;
  if (data.status || !article) return null;
  return (
    <>
      <Grid item xs={12}>
        <Banner>
          <ArticleHeader
            article={article}
            controlButtons={
              <>
                <ArticleLikeButton
                  like={article.favorited}
                  likesCount={article.favoritesCount}
                  slug={article.slug}
                  token={token}
                  mutate={mutate}
                />
                {currentUserName === article.author.username && (
                  <ArticleControlButtons slug={article.slug} token={token} />
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
  );
};

export default ArticleSection;
