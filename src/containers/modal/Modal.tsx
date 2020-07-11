import { FC, MouseEvent, SyntheticEvent, memo } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import Login from "./Login";
import CustomModal from "../../components/common/CustomModal";
import Register from "./Register";
import Editor from "./Editor";
import { setModal } from "../../redux/modal/actions";
import { ModalType } from "../../redux/modal/type";
import Article from "../article/Article";

const selectData = createSelector(
  (state: State) => state.modal.open,
  (state: State) => state.modal.modal,
  (state: State) => state.modal.slug,
  (open, modal, slug) => ({ open, modal, slug })
);

const Modal: FC = memo(() => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { open, modal, slug } = useSelector(selectData);
  const isArticle = modal === "article";
  const closeModal = () => {
    if (isArticle) window.history.back();
    else dispatch(setModal(false));
  };
  const openModal = (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setModal(true, e.currentTarget.name as ModalType));
  };
  return (
    <CustomModal open={open} isArticle={isArticle} onClose={closeModal}>
      {isArticle ? (
        <Article slug={slug} />
      ) : modal === "login" ? (
        <Login openModal={openModal} />
      ) : modal === "register" ? (
        <Register openModal={openModal} />
      ) : modal === "new" ? (
        <Editor />
      ) : modal === "edit" ? (
        <Editor slug={slug} />
      ) : null}
    </CustomModal>
  );
});

export default Modal;
