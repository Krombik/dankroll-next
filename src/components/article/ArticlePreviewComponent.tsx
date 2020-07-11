import { StyledArticlePreview } from "./styled";
import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContentInfo from "../common/ContentInfo";

type Props = {
  avatar: string | JSX.Element;
  username: string | JSX.Element;
  date: string | JSX.Element;
  likeButton: JSX.Element;
  title: string | JSX.Element;
  description: string | JSX.Element;
  href?: string;
  onModal?: (e: any) => void;
};

const ArticlePreviewComponent: FC<Props> = ({
  avatar,
  username,
  date,
  likeButton,
  title,
  description,
  children,
  onModal = null,
  href = "",
}) => (
  <Grid item xs={12} lg={6}>
    <StyledArticlePreview>
      <div>
        <ContentInfo
          avatar={avatar}
          username={username}
          date={date}
          action={likeButton}
        />
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="subtitle1">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            disabled={!href}
            component="a"
            onClick={onModal}
            href={href}
          >
            Read more
          </Button>
        </CardActions>
      </div>
      {children}
    </StyledArticlePreview>
  </Grid>
);

export default ArticlePreviewComponent;