import { FC, useCallback } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setModal } from "@/redux/modal/actions";
import TooltipIconButton from "@/components/common/TooltipIconButton";

const UserSettingsButton: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openSettings = useCallback(() => {
    dispatch(setModal(true, "settings"));
  }, []);
  return (
    <TooltipIconButton tooltip="Profile settings" onClick={openSettings}>
      <SettingsIcon fontSize="inherit" color="inherit" />
    </TooltipIconButton>
  );
};

export default UserSettingsButton;
