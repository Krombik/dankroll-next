import Tooltip from "@material-ui/core/Tooltip";
import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import { StyledSwitchableIcon } from "@/components/common/styled";

type Props = {
  onLike?: (liked: boolean, slug: string, index: number) => Promise<boolean>;
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
  const [loading, setLoading] = useState(false);
  const handleLike = async () => {
    if (!loading) {
      setLoading(true);
      const isCorrect = onLike ? await onLike(favorited, slug, index) : false;
      if (isCorrect) setLoading(false);
    }
  };
  return (
    <Tooltip title={onLike ? (favorited ? "Dislike" : "Like") : "Log in first"}>
      <div>
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
      </div>
    </Tooltip>
  );
};

export default ArticlePreviewLikeButton;
