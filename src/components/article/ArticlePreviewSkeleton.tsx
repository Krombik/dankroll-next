import { StyledSwitchableIcon } from "./styled";
import { FC } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import ArticlePreviewComponent from "./ArticlePreviewComponent";

const ArticlePreviewSkeleton: FC = () => (
  <ArticlePreviewComponent
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
        endIcon={
          <StyledSwitchableIcon Icon={FavoriteTwoToneIcon} active={false} />
        }
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
);

export default ArticlePreviewSkeleton;
