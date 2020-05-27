import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { State } from '../interfaces';


const selectData = createSelector(
  (state: State) => state.error,
  (state: State) => state.post,
  (error, post) => ({ error, post }),
);

const Post: React.FunctionComponent = () => {
  const { error, post } = useSelector(selectData);
  return (
    <div>
      {post &&
        <>
          <h2>{post.title}</h2>
          <div>{post.body}</div>
          <h3>Comments: {post.comments.length}</h3>
          {post.comments.length > 0 && post.comments.sort((a, b) => b.postId - a.postId).map((item, index) => (
            <div key={index}>
              {item.body}
            </div>
          ))}
        </>
      }
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default Post;
