
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { loadAllPostsList } from '../actions';
import { useDispatch } from 'react-redux'
const NewPost = ({ onSubmitExtra = null }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    const dispatch = useDispatch();
    const onSubmit = async () => {
        await axios.post('https://simple-blog-api.crew.red/posts', { title, body: text });
        setText('');
        setTitle('');
        dispatch(loadAllPostsList());
        if (onSubmitExtra) onSubmitExtra();
    }
    return (
        <form>
            <TextField
                label="Title"
                variant="outlined"
                required
                value={title}
                onInput={onTitleChange}
            />
            <TextField
                label="Text"
                required
                multiline
                rows={10}
                variant="outlined"
                value={text}
                onInput={onTextChange}
            />
            <Button variant="contained" color="primary" disabled={title.trim() === '' || text.trim() === ''} onClick={onSubmit}>
                Submit
            </Button>
        </form>
    );
}

export default NewPost;