import {
  StyledIconButton,
  StyledCardHeader,
  StyledArticleHeaderComponent,
} from "../../components/article/styled";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { FC, useMemo } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import TagList from "../common/TagList";
import { createMuiTheme, useTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { State } from "../../types";

const selectData = createSelector(
  (state: State) => state.common.isDark,
  (isDark) => ({ isDark })
);

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
}) => {
  const { isDark } = useSelector(selectData);
  const theme = useTheme();
  const invertTheme = useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          type: isDark ? "light" : "dark",
        },
      }),
    [isDark]
  );
  return (
    <ThemeProvider theme={invertTheme}>
      <StyledArticleHeaderComponent
        backgroundColor={invertTheme.palette.background.default}
      >
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
      </StyledArticleHeaderComponent>
    </ThemeProvider>
  );
};

export default ArticleHeader;
