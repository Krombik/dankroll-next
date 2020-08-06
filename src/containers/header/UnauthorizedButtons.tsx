import { FC, useCallback, MouseEvent } from "react";
import TooltipIconButton from "@/components/common/TooltipIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setModal } from "@/redux/modal/actions";
import { ModalType } from "@/redux/modal/type";

const UnauthorizedButtons: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const openModal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    dispatch(setModal(true, e.currentTarget.name as ModalType));
  }, []);
  return (
    <>
      <TooltipIconButton tooltip="Sign in" name="login" onClick={openModal}>
        <ExitToAppIcon />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Sign up" name="register" onClick={openModal}>
        <PersonAddIcon />
      </TooltipIconButton>
    </>
  );
};

export default UnauthorizedButtons;
