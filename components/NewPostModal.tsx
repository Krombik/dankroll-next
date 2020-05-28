import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import NewPost from './NewPost';
import styled from 'styled-components';

const Modal = styled(Dialog)`
  .MuiDialog-paper {
    padding: 2%;
  }
`;

const NewPostModal = ({ open, onClose }) => {
  return (
    <Modal open={open} keepMounted onClose={onClose}>
      <DialogTitle>Add new post</DialogTitle>
      <DialogContent>
        <NewPost onSubmitExtra={onClose} />
      </DialogContent>
    </Modal>
  );
};

export default NewPostModal;
