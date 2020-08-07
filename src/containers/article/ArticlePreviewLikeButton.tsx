import Tooltip from "@material-ui/core/Tooltip";
import { FC, useState } from "react";
import Button from "@material-ui/core/Button";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import SwitchableIcon from "@/components/common/SwitchableIcon";

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
    if (onLike && !loading) {
      setLoading(true);
      if (await onLike(favorited, slug, index)) setLoading(false);
    }
  };
  return (
    <Tooltip title={onLike ? (favorited ? "Dislike" : "Like") : "Log in first"}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLike}
          endIcon={
            <SwitchableIcon Icon={FavoriteTwoToneIcon} active={favorited} />
          }
        >
          {favoritesCount}
        </Button>
      </div>
    </Tooltip>
  );
};

export default ArticlePreviewLikeButton;
