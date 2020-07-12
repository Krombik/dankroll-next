import Grid from "@material-ui/core/Grid";
import { FC, useState, useCallback, ChangeEvent } from "react";
import { CommentType, CommentsObj } from "../../types/comment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import { FetchRV } from "../../types";
import { createArticleComment } from "../../api/comment";

type Props = {
  slug: string;
  token: string;
  mutate: (data: FetchRV<CommentsObj>, shouldRevalidate?: boolean) => any;
  comments: CommentType[];
};

const PostComment: FC<Props> = ({ slug, token, mutate, comments }) => {
  const [loading, setLoading] = useState(false);
  const [body, setComment] = useState("");
  const handleComment = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  }, []);
  const postComment = async () => {
    if (body.trim().length > 0) {
      setLoading(true);
      const { comment } = await createArticleComment(slug, { body }, token);
      if (comment) {
        mutate({ comments: [comment, ...comments] }, false);
        setComment("");
      }
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardMedia>
        <TextField
          value={body}
          variant="outlined"
          onChange={handleComment}
          multiline
          rows={3}
          fullWidth
        />
      </CardMedia>
      <CardActions>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            onClick={postComment}
            color="primary"
            disabled={loading}
          >
            Post comment
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PostComment;
