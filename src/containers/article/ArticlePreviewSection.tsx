import { ArticlesObj, ArticleType } from "../../types/article";
import { FC, MouseEvent, useCallback, useEffect } from "react";
import { likeArticle } from "../../api/article";
import { FetchRV, ThunkDispatcher } from "../../types";
import { useDispatch } from "react-redux";
import cloneDeep from "lodash.clonedeep";
import { setModal } from "../../redux/modal/actions";
import ArticlePreview from "../../components/article/ArticlePreview";
import ArticlePreviewLikeButton from "./ArticlePreviewLikeButton";
import TagList from "../tag/TagList";
import { setError } from "../../redux/error/actions";

type Props = {
  data: FetchRV<ArticlesObj>[];
  token: string;
  mutate: (data?: FetchRV<ArticlesObj>[], shouldRevalidate?: boolean) => any;
  offset: number;
};

const ArticlePreviewSection: FC<Props> = ({ data, token, mutate, offset }) => {
  const articles = data
    .filter(({ articles }) => !!articles)
    .flatMap(({ articles }) => articles) as ArticleType[];
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    const lastData = data[data.length - 1];
    if (lastData.status) dispatch(setError(true, lastData));
  });
  const handleLike = async (liked: boolean, slug: string, index: number) => {
    const res = await likeArticle(!liked, slug, token);
    if (res.article) {
      const newData = cloneDeep(data) as ArticlesObj[];
      newData[Math.floor(index / offset)].articles[index % offset] =
        res.article;
      mutate(newData, false);
    } else {
      dispatch(setError(true, res));
    }
  };
  const handleModal = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const path = e.currentTarget.pathname;
    dispatch(setModal(true, "article", path.replace("/articles/", "")));
    window.history.pushState("", "", path);
  }, []);
  return (
    <>
      {articles.map((article, index) => (
        <ArticlePreview
          key={index}
          avatar={article.author.image}
          username={article.author.username}
          date={
            article.updatedAt === article.createdAt
              ? new Date(article.createdAt).toDateString()
              : new Date(article.updatedAt).toDateString().concat(" (Edited)")
          }
          likeButton={
            <ArticlePreviewLikeButton
              favorited={article.favorited}
              favoritesCount={article.favoritesCount}
              onLike={token ? handleLike : undefined}
              slug={article.slug}
              index={index}
            />
          }
          title={article.title}
          description={article.description}
          onModal={handleModal}
          href={"/articles/" + article.slug}
        >
          {article?.tagList.length > 0 && <TagList tagList={article.tagList} />}
        </ArticlePreview>
      ))}
    </>
  );
};

export default ArticlePreviewSection;
