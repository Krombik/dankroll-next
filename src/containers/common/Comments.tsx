import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { getArticleCommentsUrl } from "../../api/comment";
import { CommentsObj } from "../../types/comment";
import Comment from "../../components/common/Comment";

type Props = {
  initialData?: CommentsObj;
  slug: string;
};

const Comments: FC<Props> = ({ initialData, slug }) => {
  const { data } = useSWR<CommentsObj>(getArticleCommentsUrl(slug), fetcher, {
    initialData,
  });
  return (
    <>
      <Typography variant="h5">Comments: {data?.comments.length}</Typography>
      <Grid container spacing={3}>
        {data?.comments.map((comment, index) => (
          <Grid item xs={12} key={index}>
            <Comment
              username={comment.author.username}
              avatar={comment.author.image}
              date={comment.createdAt}
              body={comment.body}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Comments;
