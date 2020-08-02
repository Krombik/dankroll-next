import { FC } from "react";
import ArticlePreview from "../../components/article/ArticlePreview";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";

type Props = {
  count: number;
};

const ArticlePreviewSkeletonSection: FC<Props> = ({ count }) => (
  <>
    {Array.from(new Array(count)).map((_, index) => (
      <ArticlePreview
        key={index}
        avatar={
          <Skeleton animation={false} variant="circle">
            <Avatar />
          </Skeleton>
        }
        username={<Skeleton animation={false} width="30%" />}
        date={<Skeleton animation={false} width="40%" />}
        likeButton={
          <Button
            variant="contained"
            color="primary"
            disabled
            endIcon={<FavoriteTwoToneIcon />}
          >
            ?
          </Button>
        }
        title={<Skeleton animation={false} width="70%" />}
        description={
          <>
            <Skeleton animation={false} width="100%" />
            <Skeleton animation={false} width="95%" />
            <Skeleton animation={false} width="80%" />
          </>
        }
      />
    ))}
  </>
);

export default ArticlePreviewSkeletonSection;
