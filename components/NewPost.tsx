
// import NewPostModal from './NewPostModal'
// import Router, { useRouter } from "next/router";
// import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
const NewPost = ({ onSubmitExtra = null }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    // const { pathname } = useRouter();
    // const handleClickOpen = () => {
    //     setOpen(true);
    //     Router.push(pathname, "/posts/new", { shallow: true });
    // }
    // const handleClose = () => {
    //     setOpen(false);
    //     Router.back();
    // }
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }
    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }
    const onSubmit = async () => {
        await axios.post('https://simple-blog-api.crew.red/posts', { title, body: text });
        if (onSubmitExtra) onSubmitExtra();
    }
    return (
        <div>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onInput={onTitleChange}
            />
            <TextField
                label="Text"
                multiline
                rows={10}
                variant="outlined"
                value={text}
                onInput={onTextChange}
            />
            <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default NewPost;