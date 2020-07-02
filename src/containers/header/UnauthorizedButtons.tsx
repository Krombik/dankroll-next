import { FC } from "react";
import TooltipIconButton from "../../components/common/TooltipIconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

type Props = {
  openModal: (e: any) => void;
};

const UnauthorizedButtons: FC<Props> = ({ openModal }) => (
  <>
    <TooltipIconButton tooltip="Sign in" name="login" onClick={openModal}>
      <ExitToAppIcon />
    </TooltipIconButton>
    <TooltipIconButton tooltip="Sign up" name="register" onClick={openModal}>
      <PersonAddIcon />
    </TooltipIconButton>
  </>
);

export default UnauthorizedButtons;
