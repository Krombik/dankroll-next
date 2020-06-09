import Link from "next/link";
import { StyledArticlePreview } from "./style";
import { Typography, Grid } from "@material-ui/core";
import { FC } from "react";

type Props = {
  title: string;
  body: string;
};

const ArticlePreview: FC<Props> = ({ title, body }) => (
  <Grid item xs={12} lg={6}>
    <StyledArticlePreview>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{body}</Typography>
    </StyledArticlePreview>
  </Grid>
);

export default ArticlePreview;
