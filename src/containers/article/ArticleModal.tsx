import { FC } from "react";
import Article from "./Article";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setArticleModalOpen } from "../../redux/articleModal/actions";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import CustomModal from "../../components/common/CustomModal";

const selectData = createSelector(
  (state: State) => state.articleModal.isOpen,
  (state: State) => state.articleModal.slug,
  (isOpen, slug) => ({ isOpen, slug })
);

const ArticleModal: FC = () => {
  const { isOpen, slug } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleClose = () => {
    dispatch(setArticleModalOpen(false));
    Router.back();
  };
  return (
    <CustomModal open={isOpen} onClose={handleClose}>
      <Grid item container spacing={3} justify="center">
        <Article slug={slug} />
      </Grid>
    </CustomModal>
  );
};

export default ArticleModal;
