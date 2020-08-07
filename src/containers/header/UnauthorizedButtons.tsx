import { FC, useCallback } from "react";
import TooltipIconButton from "@/components/common/TooltipIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setModal } from "@/redux/modal/actions";

const UnauthorizedButtons: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openRegister = useCallback(() => {
    dispatch(setModal(true, "register"));
  }, []);
  const openLogin = useCallback(() => {
    dispatch(setModal(true, "login"));
  }, []);
  return (
    <>
      <TooltipIconButton tooltip="Sign in" onClick={openLogin}>
        <ExitToAppIcon />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Sign up" onClick={openRegister}>
        <PersonAddIcon />
      </TooltipIconButton>
    </>
  );
};

export default UnauthorizedButtons;
