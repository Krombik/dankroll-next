import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { getArticleCommentsUrl } from "../../api/comment";
import { CommentsObj, CommentType } from "../../types/comment";
import Comment from "../../components/common/Comment";
import { FetchError } from "../../types";

type Props = {
  comments: CommentType[];
};

const Comments: FC<Props> = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => (
        <Grid item xs={12} key={index}>
          <Comment
            username={comment.author.username}
            avatar={comment.author.image}
            date={comment.createdAt}
            body={comment.body}
          />
        </Grid>
      ))}
    </>
  );
};

export default Comments;
