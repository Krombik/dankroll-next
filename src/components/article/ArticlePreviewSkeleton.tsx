import { StyledArticlePreview, StyledFavoriteTwoToneIcon } from "./styled";
import { FC } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import ContentInfo from "../common/ContentInfo";

const ArticlePreviewSkeleton: FC = () => (
  <Grid item xs={12} lg={6}>
    <StyledArticlePreview>
      <div>
        <ContentInfo
          avatar={
            <Skeleton animation={false} variant="circle">
              <Avatar />
            </Skeleton>
          }
          username={<Skeleton animation={false} width="30%" />}
          date={<Skeleton animation={false} width="40%" />}
          action={
            <Button
              variant="contained"
              color="primary"
              disabled
              endIcon={<StyledFavoriteTwoToneIcon liked={false} />}
            >
              ?
            </Button>
          }
        />
        <CardContent>
          <Typography variant="h5">
            <Skeleton animation={false} width="70%" />
          </Typography>
          <Typography variant="subtitle1">
            <Skeleton animation={false} width="100%" />
            <Skeleton animation={false} width="95%" />
            <Skeleton animation={false} width="80%" />
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" disabled color="primary">
            Read more
          </Button>
        </CardActions>
      </div>
    </StyledArticlePreview>
  </Grid>
);

export default ArticlePreviewSkeleton;
