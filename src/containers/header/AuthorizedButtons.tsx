import { FC, useCallback, MouseEvent } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TooltipIconButton from "@/components/common/TooltipIconButton";
import CreateIcon from "@material-ui/icons/Create";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setAuthorized } from "@/redux/authentication/actions";
import { destroyCookie } from "nookies";
import { setModal } from "@/redux/modal/actions";

type Props = {
  currentUserName: string;
};

const AuthorizedButtons: FC<Props> = ({ currentUserName }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleLogout = useCallback(() => {
    dispatch(setAuthorized("", ""));
    destroyCookie(null, "token", { path: "/" });
  }, []);
  const handleEditor = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!window.location.pathname.startsWith("/new")) {
      dispatch(setModal(true, "new"));
      window.history.pushState("", "", "/new");
    }
  }, []);
  return (
    <>
      <TooltipIconButton tooltip="New post" href="/new" onClick={handleEditor}>
        <CreateIcon />
      </TooltipIconButton>
      <TooltipIconButton
        tooltip={currentUserName}
        href="/user/[username]"
        as={`/user/${currentUserName}`}
      >
        <AccountCircleIcon />
      </TooltipIconButton>
      <TooltipIconButton tooltip="Logout" onClick={handleLogout}>
        <MeetingRoomIcon />
      </TooltipIconButton>
    </>
  );
};

export default AuthorizedButtons;
