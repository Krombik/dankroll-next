import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { State } from '../interfaces';
import { Grid, Paper, Button } from '@material-ui/core';
import styled from 'styled-components';

const selectData = createSelector(
  (state: State) => state.error,
  (state: State) => state.allPostsList,
  (error, allPostsList) => ({ error, allPostsList }),
);

const PostPreview = styled(Paper)`
  padding: 25px;
  h3 {
    font-size: 20px;
    margin: 0;
  }
  p {
    font-size: 14px;
    margin: 10px 0 25px;
  }
`;

const Home = () => {
  const { error, allPostsList } = useSelector(selectData);
  return (
    <Grid container spacing={3}>
      {allPostsList &&
        allPostsList
          .sort((a, b) => b.id - a.id)
          .map(({ title, body, id }, index) => (
            <Grid item xs={12} md={3} sm={4} key={index}>
              <PostPreview>
                <h3>{title}</h3>
                <p>{body.length > 150 ? body.slice(0, 150).concat('...') : body}</p>
                <Link as={`/posts/${id}`} href={`/posts/[id]?id=${id}`}>
                  <Button variant="contained" color="primary">
                    See more...
                  </Button>
                </Link>
              </PostPreview>
            </Grid>
          ))}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </Grid>
  );
};

export default Home;
