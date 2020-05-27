
import NewPostModal from './NewPostModal'
import Router, { useRouter } from "next/router";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useRouter();
    const handleClickOpen = () => {
        setOpen(true);
        Router.push(pathname, "/posts/new", { shallow: true });
    }
    const handleClose = () => {
        setOpen(false);
        Router.back();
    }
    return (
        <div>
            Hello World. <div>About</div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
            </Button>
            <NewPostModal
                onClose={handleClose}
                open={open}
            />
        </div>
    );
}

export default Header;