import { FC, useState, useCallback } from "react";
import { StyledIconButton } from "../../components/article/styled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { ThunkDispatcher, State } from "../../types";
import { setModal } from "../../redux/modal/actions";
import { deleteArticle } from "../../api/article";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

type Props = {
  slug: string;
};

const selectData = createSelector(
  (state: State) => state.common.token,
  (token) => ({ token })
);

const ArticleControlButtons: FC<Props> = ({ slug }) => {
  const { token } = useSelector(selectData);
  const dispatch = useDispatch<ThunkDispatcher>();
  const openModal = () => {
    dispatch(setModal(true, "edit", slug));
  };
  const router = useRouter();
  const handleDelete = async () => {
    await deleteArticle(slug, token);
    dispatch(setModal(false));
    if (window.history.length > 0) router.back();
    else router.push("/");
  };
  return (
    <>
      <StyledIconButton onClick={openModal}>
        <EditIcon fontSize="inherit" color="inherit" />
      </StyledIconButton>
      <StyledIconButton onClick={handleDelete}>
        <DeleteIcon fontSize="inherit" color="inherit" />
      </StyledIconButton>
    </>
  );
};

export default ArticleControlButtons;
