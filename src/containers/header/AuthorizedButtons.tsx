import { FC } from "react";
import TooltipIconButton from "../../components/common/TooltipIconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TooltipIconLink from "../../components/common/TooltipIconLink";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setUnauthorized } from "../../redux/common/actions";

type Props = {
  currentUserName: string;
};

const AuthorizedButtons: FC<Props> = ({ currentUserName }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleLogout = () => {
    dispatch(setUnauthorized());
  };
  return (
    <>
      <TooltipIconLink tooltip="New post" href="/" as={`/`}>
        <CreateIcon />
      </TooltipIconLink>
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
