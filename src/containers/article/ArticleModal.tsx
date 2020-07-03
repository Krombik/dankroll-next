import { FC } from "react";
import Article from "./Article";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import { setArticleModalOpen } from "../../redux/articleModal/actions";
import Grid from "@material-ui/core/Grid";
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
    window.history.go(-1);
  };
  return (
    <CustomModal open={isOpen} isArticle onClose={handleClose}>
      <Grid item container spacing={3}>
        <Article slug={slug} />
      </Grid>
    </CustomModal>
  );
};

export default ArticleModal;
