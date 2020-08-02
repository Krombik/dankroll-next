import Tooltip from "@material-ui/core/Tooltip";
import { FC } from "react";
import Button from "@material-ui/core/Button";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { StyledSwitchableIcon } from "../../components/common/styled";

type Props = {
  onLike?: (liked: boolean, slug: string, index: number) => Promise<void>;
  index: number;
  favorited: boolean;
  slug: string;
  favoritesCount: number;
};

const ArticlePreviewLikeButton: FC<Props> = ({
  favorited,
  slug,
  favoritesCount,
  onLike,
  index,
}) => {
  let loading = false;
  const handleLike = async () => {
    if (!loading) {
      loading = true;
      if (onLike) await onLike(favorited, slug, index);
    }
  };
  return (
    <Tooltip title={onLike ? (favorited ? "Dislike" : "Like") : "Log in first"}>
      <span>
        <Button
          variant="contained"
          color="primary"
          disabled={!onLike}
          onClick={handleLike}
          endIcon={
            <StyledSwitchableIcon
              Icon={FavoriteTwoToneIcon}
              active={favorited}
            />
          }
        >
          {favoritesCount}
        </Button>
      </span>
    </Tooltip>
  );
};

export default ArticlePreviewLikeButton;
