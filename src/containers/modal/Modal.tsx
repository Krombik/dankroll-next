import { FC, MouseEvent, SyntheticEvent, memo, useEffect } from "react";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "@/types";
import Login from "./Login";
import CustomModal from "@/components/common/CustomModal";
import Register from "./Register";
import Editor from "./Editor";
import { setModal } from "@/redux/modal/actions";
import { ModalType } from "@/redux/modal/type";
import Article from "../article/Article";
import Router from "next/router";
import Settings from "./Settings";
import Grid from "@material-ui/core/Grid";

const selectData = createSelector(
  (state: State) => state.modal.open,
  (state: State) => state.modal.modal,
  (state: State) => state.modal.slug,
  (state: State) => state.modal.refreshArticleList,
  (open, modal, slug, refreshArticleList) => ({
    open,
    modal,
    slug,
    refreshArticleList,
  })
);

const Modal: FC = memo(() => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const { open, modal, slug, refreshArticleList } = useSelector(selectData);
  const isArticle = modal === "article";
  const isEdit = modal === "edit";
  const isNew = modal === "new";
  const isLogin = modal === "login";
  const isRegister = modal === "register";
  useEffect(() => {
    if (!open && (isArticle || isEdit || isNew) && refreshArticleList)
      refreshArticleList();
  }, [open]);
  const closeModal = () => {
    if (
      isArticle ||
      (isEdit &&
        window.location.pathname.includes("/articles/") &&
        !Router.query.slug)
    )
      window.history.back();
    if (!isArticle) dispatch(setModal(false));
  };
  const openModal = (e: SyntheticEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setModal(true, e.currentTarget.name as ModalType));
  };
  return (
    <CustomModal
      open={open}
      article={isArticle}
      authorization={isLogin || isRegister}
      onClose={closeModal}
    >
      {isArticle ? (
        <Grid container spacing={3}>
          <Article slug={slug} />
        </Grid>
      ) : isLogin ? (
        <Login openModal={openModal} />
      ) : isRegister ? (
        <Register openModal={openModal} />
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
