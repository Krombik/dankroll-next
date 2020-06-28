import {
  StyledIconButton,
  StyledCardHeader,
} from "../../components/article/styled";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TagList from "../common/TagList";

type Props = {
  title: string;
  favoritesCount: number;
  tagList: string[];
  avatar: string;
  username: string;
  isFavorite: boolean;
  date: string;
};

const ArticleHeader: FC<Props> = ({
  title,
  favoritesCount,
  tagList,
  avatar,
  username,
  isFavorite,
  date,
}) => (
  <>
    <Typography variant="h2" color="textPrimary">
      <Grid container>
        {title}
        <StyledIconButton>
          <Badge
            badgeContent={favoritesCount}
            color="primary"
            overlap="circle"
            showZero
          >
            {isFavorite ? (
              <FavoriteIcon fontSize="inherit" color="inherit" />
            ) : (
              <FavoriteBorderIcon fontSize="inherit" color="inherit" />
            )}
          </Badge>
        </StyledIconButton>
      </Grid>
    </Typography>
    {tagList.length > 0 && <TagList tagList={tagList} />}
    <StyledCardHeader
      avatar={avatar}
      titleTypographyProps={{ color: "textPrimary" }}
      username={username}
      date={date}
    />
  </>
);

export default ArticleHeader;
