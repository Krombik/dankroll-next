import { FC } from "react";
import TooltipIconButton from "../../components/common/TooltipIconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TooltipIconLink from "../../components/common/TooltipIconLink";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setUnauthorized } from "../../redux/common/actions";
import { destroyCookie } from "nookies";

type Props = {
  currentUserName: string;
  openModal: (e: any) => void;
};

const AuthorizedButtons: FC<Props> = ({ currentUserName, openModal }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleLogout = () => {
    dispatch(setUnauthorized());
    destroyCookie(null, "token");
  };
  return (
    <>
      <TooltipIconButton tooltip="New post" name="editor" onClick={openModal}>
        <CreateIcon />
      </TooltipIconButton>
      <TooltipIconLink
        tooltip={currentUserName}
        href="/user/[username]"
        as={`/user/${currentUserName}`}
      >
        <AccountCircleIcon />
      </TooltipIconLink>
      <TooltipIconButton tooltip="Logout" onClick={handleLogout}>
        <MeetingRoomIcon />
      </TooltipIconButton>
    </>
  );
};

export default AuthorizedButtons;
