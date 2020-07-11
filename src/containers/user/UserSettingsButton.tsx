import { FC } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setModal } from "../../redux/modal/actions";
import BannerButton from "../../components/common/BannerButton";

const UserSettingsButton: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openModal = () => {
    dispatch(setModal(true, "settings"));
  };
  return (
    <BannerButton tooltip="Settings" onClick={openModal}>
      <SettingsIcon fontSize="inherit" color="inherit" />
    </BannerButton>
  );
};

export default UserSettingsButton;
