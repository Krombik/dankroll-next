import { Button, TextField, Grid } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { loadAllPostsList } from '../actions';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const GridContainer = styled(Grid)`
  .MuiGrid-item:not(:last-child) {
    margin-bottom: 25px;
  }
  .MuiFormControl-root {
    width: 100%;
  }
`;

const NewPost = ({ onSubmitExtra = null }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const dispatch = useDispatch();
  const onSubmit = async () => {
    await axios.post('https://simple-blog-api.crew.red/posts', { title, body: text });
    setText('');
    setTitle('');
    dispatch(loadAllPostsList());
    if (onSubmitExtra) onSubmitExtra();
  };
  return (
    <form>
      <GridContainer container>
        <Grid item xs={12}>
          <TextField
            label="Title"
            variant="outlined"
            required
            value={title}
            onInput={onTitleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Text"
            required
            multiline
            rows={10}
            variant="outlined"
            value={text}
            onInput={onTextChange}
          />
        </Grid>
        <Grid container item xs={12} justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            disabled={title.trim() === '' || text.trim() === ''}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
      </GridContainer>
    </form>
  );
};

export default NewPost;
