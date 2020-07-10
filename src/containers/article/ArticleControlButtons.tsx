import { FC } from "react";
import { StyledIconButton } from "../../components/article/styled";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setModal } from "../../redux/modal/actions";
import { deleteArticle } from "../../api/article";
import Router from "next/router";
import Tooltip from "@material-ui/core/Tooltip";

type Props = {
  slug: string;
  token: string;
};

const ArticleControlButtons: FC<Props> = ({ slug, token }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openModal = () => {
    dispatch(setModal(true, "edit", slug));
  };
  const handleDelete = async () => {
    await deleteArticle(slug, token);
    dispatch(setModal(false));
    if (window.history.length > 0) Router.back();
    else Router.push("/");
  };
  return (
    <>
      <Tooltip title={"Edit"}>
        <StyledIconButton onClick={openModal}>
          <EditIcon fontSize="inherit" color="inherit" />
        </StyledIconButton>
      </Tooltip>
      <Tooltip title={"Delete"}>
        <StyledIconButton onClick={handleDelete}>
          <DeleteIcon fontSize="inherit" color="inherit" />
        </StyledIconButton>
      </Tooltip>
    </>
  );
};

export default ArticleControlButtons;
