import Grid from "@material-ui/core/Grid";
import { FC, MutableRefObject } from "react";
import useSWR from "swr";
import Comments from "../comment/Comments";
import PostComment from "../comment/PostComment";
import { CommentsObj } from "../../types/comment";
import { getArticleCommentsUrl } from "../../api/comment";
import Typography from "@material-ui/core/Typography";
import { FetchRV } from "../../types";
import Spinner from "../../components/common/Spinner";
import fetcher from "../../utils/fetcher";

type Props = {
  token: string;
  currentUserName: string;
  initialComments?: FetchRV<CommentsObj>;
  initialCommentsRef?: MutableRefObject<FetchRV<CommentsObj>>;
  slug: string;
};

const CommentSection: FC<Props> = ({
  token,
  currentUserName,
  initialComments,
  initialCommentsRef,
  slug,
}) => {
  const { data = initialComments, mutate } = useSWR<FetchRV<CommentsObj>>(
    [getArticleCommentsUrl(slug), token],
    fetcher.get,
    {
      initialData: initialCommentsRef?.current,
    }
  );
  if (initialCommentsRef?.current) initialCommentsRef.current = undefined;
  const comments = data?.comments;
  if (!comments) return <Spinner />;
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h4">Comments: {comments.length}</Typography>
      </Grid>
      {token && (
        <Grid item xs={12}>
          <PostComment
            slug={slug}
            token={token}
            mutate={mutate}
            comments={comments}
          />
        </Grid>
      )}
      {comments.length > 0 && (
        <Comments
          comments={comments}
          slug={slug}
          token={token}
          mutate={mutate}
          currentUserName={currentUserName}
        />
      )}
    </>
  );
};

export default CommentSection;
