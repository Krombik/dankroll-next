import Grid from "@material-ui/core/Grid";
import { FC, useCallback } from "react";
import { CommentType, CommentsObj } from "../../types/comment";
import Comment from "../../components/common/Comment";
import { FetchRV, ThunkDispatcher } from "../../types";
import { deleteArticleComment } from "../../api/comment";
import { useDispatch } from "react-redux";
import { setError } from "../../redux/common/actions";

type Props = {
  comments: CommentType[];
  currentUserName: string;
  slug: string;
  token: string;
  mutate: (data: FetchRV<CommentsObj>, shouldRevalidate?: boolean) => any;
};

const Comments: FC<Props> = ({
  comments,
  currentUserName,
  slug,
  token,
  mutate,
}) => {
  let loading = false;
  const dispatch = useDispatch<ThunkDispatcher>();
  const deleteComment = async (id: number) => {
    if (!loading) {
      const data = await deleteArticleComment(slug, id, token);
      if (data.status) {
        dispatch(setError(true, data.status, data.errors));
      } else {
        mutate({ comments: comments.filter((item) => item.id !== id) }, false);
      }
    }
  };
  return (
    <>
      {comments.map((comment, index) => (
        <Grid item xs={12} key={index}>
          <Comment
            username={comment.author.username}
            avatar={comment.author.image}
            date={new Date(comment.createdAt).toDateString()}
            onDelete={
              comment.author.username === currentUserName ? deleteComment : null
            }
            body={comment.body}
            id={comment.id}
          />
        </Grid>
      ))}
    </>
  );
};

export default Comments;
