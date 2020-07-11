import { FC } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setModal } from "../../redux/modal/actions";
import { deleteArticle } from "../../api/article";
import Router from "next/router";
import BannerButton from "../../components/common/BannerButton";

type Props = {
  slug: string;
  token: string;
};

const UserSettingsButton: FC<Props> = ({ slug, token }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openModal = () => {
    dispatch(setModal(true, "edit", slug));
  };
  return (
    <BannerButton tooltip="Edit" onClick={openModal}>
      <SettingsIcon fontSize="inherit" color="inherit" />
    </BannerButton>
  );
};

export default UserSettingsButton;
