import { FC, useState } from "react";
import TooltipIconButton from "../../components/common/TooltipIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import Login from "./Login";
import CustomModal from "../../components/common/CustomModal";
import Register from "./Register";

const UnauthorizedButtons: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const openLogin = () => {
    setModal("login");
    setOpen(true);
  };
  const openRegister = () => {
    setModal("register");
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <TooltipIconButton tooltip="Sign in" onClick={openLogin}>
        <ExitToAppIcon />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Sign up" onClick={openRegister}>
        <PersonAddIcon />
      </TooltipIconButton>

      <CustomModal open={open} onClose={closeModal}>
        {modal === "login" ? (
          <Login setModal={openRegister} />
        ) : modal === "register" ? (
          <Register setModal={openLogin} />
        ) : null}
      </CustomModal>
    </>
  );
};

export default UnauthorizedButtons;
