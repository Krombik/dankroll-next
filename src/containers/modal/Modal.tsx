import { FC, memo, useCallback } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "@/types";
import Login from "./Login";
import CustomModal from "@/components/common/CustomModal";
import Register from "./Register";
import Editor from "./Editor";
import { setModal } from "@/redux/modal/actions";
import Article from "../article/Article";
import Settings from "./Settings";

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
  const isEdit = modal === "edit";
  const isNew = modal === "new";
  const closeModal = useCallback(() => {
    if (isArticle || isNew || isEdit) window.history.back();
    else dispatch(setModal(false));
  }, [modal]);
  return (
    <CustomModal open={open} onClose={closeModal}>
      {isArticle ? (
        <Article slug={slug} />
      ) : modal === "login" ? (
        <Login />
      ) : modal === "register" ? (
        <Register />
      ) : isNew ? (
        <Editor />
      ) : isEdit ? (
        <Editor slug={slug} />
      ) : modal === "settings" ? (
        <Settings />
      ) : (
        <div></div>
      )}
    </CustomModal>
  );
});

export default Modal;
