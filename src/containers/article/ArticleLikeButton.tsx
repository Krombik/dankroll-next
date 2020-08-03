import { ArticleObj } from "@/types/article";
import { FC } from "react";
import { likeArticle } from "@/api/article";
import { FetchRV, ThunkDispatcher } from "@/types";
import Badge from "@material-ui/core/Badge";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { useDispatch } from "react-redux";
import { setError } from "@/redux/error/actions";
import TooltipIconButton from "@/components/common/TooltipIconButton";
import { StyledSwitchableIcon } from "@/components/common/styled";

type Props = {
  like: boolean;
  likesCount: number;
  mutate: (data: FetchRV<ArticleObj>, shouldRevalidate?: boolean) => any;
  slug: string;
  token: string;
};

const ArticleLikeButton: FC<Props> = ({
  like,
  likesCount,
  mutate,
  token,
  slug,
}) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleLike = async () => {
    const data = await likeArticle(!like, slug, token);
    if (data.article) {
      mutate(data, false);
    } else {
      dispatch(setError(true, data));
    }
  };
  return (
    <TooltipIconButton
      tooltip={like ? "Dislike" : "Like"}
      disabled={!token}
      onClick={handleLike}
    >
      <Badge
        badgeContent={likesCount}
        color="primary"
        overlap="circle"
        showZero
      >
        <StyledSwitchableIcon
          fontSize="inherit"
          color="inherit"
          active={like}
          Icon={FavoriteTwoToneIcon}
        />
      </Badge>
    </TooltipIconButton>
  );
};

export default ArticleLikeButton;
