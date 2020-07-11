import { ArticleType } from "../../types/article";
import { FC } from "react";
import TagList from "../tag/TagList";
import ArticlePreviewLikeButton from "./ArticlePreviewLikeButton";
import ArticlePreviewComponent from "../../components/article/ArticlePreviewComponent";

type Props = {
  article: ArticleType;
  onLike: (liked: boolean, slug: string, index: number) => Promise<void>;
  index: number;
  onModal: (e: any) => void;
};

const ArticlePreview: FC<Props> = ({ article, onLike, index, onModal }) => (
  <ArticlePreviewComponent
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
        onLike={onLike}
        slug={article.slug}
        index={index}
      />
    }
    title={article.title}
    description={article.description}
    onModal={onModal}
    href={"/articles/" + article.slug}
  >
    {article?.tagList.length > 0 && <TagList tagList={article.tagList} />}
  </ArticlePreviewComponent>
);

export default ArticlePreview;
