import { ArticleObj } from "../../types/article";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import { getArticleUrl } from "../../api/article";
import ArticleHeader from "./ArticleHeader";
import Markdown from "react-markdown";
import { Link, Divider } from "@material-ui/core";
import { FetchRV } from "../../types";
import Spinner from "../../components/common/Spinner";
import Banner from "../common/Banner";
import fetcher from "../../utils/fetcher";
import ArticleControlButtons from "./ArticleControlButtons";
import { useInitialSWR } from "../../utils/useInitialSWR";
import ArticleLikeButton from "./ArticleLikeButton";

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
  const { data = initialArticle, mutate } = useInitialSWR<FetchRV<ArticleObj>>(
    [getArticleUrl(slug), token],
    fetcher.get,
    initialArticle
  );
  const article = data?.article;
  if (!article) return <Spinner />;
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
