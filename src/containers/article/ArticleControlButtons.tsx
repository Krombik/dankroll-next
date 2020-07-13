import { FC } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setModal } from "../../redux/modal/actions";
import { deleteArticle } from "../../api/article";
import Router from "next/router";
import BannerButton from "../../components/common/BannerButton";
import { setError } from "../../redux/common/actions";

type Props = {
  slug: string;
  token: string;
};

const ArticleControlButtons: FC<Props> = ({ slug, token }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openModal = () => {
    dispatch(setModal(true, "edit", slug));
  };
  let loading = false;
  const handleDelete = async () => {
    if (!loading) {
      loading = true;
      const data = await deleteArticle(slug, token);
      if (data.status) {
        dispatch(setError(true, data.status, data.errors));
      } else {
        dispatch(setModal(false));
        if (window.history.length > 0) Router.back();
        else Router.replace("/");
      }
    }
  };
  return (
    <>
      <BannerButton tooltip="Edit" onClick={openModal}>
        <EditIcon fontSize="inherit" color="inherit" />
      </BannerButton>
      <BannerButton tooltip="Delete" onClick={handleDelete}>
        <DeleteIcon fontSize="inherit" color="inherit" />
      </BannerButton>
    </>
  );
};

export default ArticleControlButtons;
