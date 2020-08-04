import { FC, useCallback } from "react";
import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setModal } from "@/redux/modal/actions";

type Props = CardHeaderProps & {
  username: string | JSX.Element;
  avatar: string | JSX.Element;
  date: string | JSX.Element;
};

type LinkToUserProps = {
  username: string;
  onClick: () => void;
};

const LinkToUser: FC<LinkToUserProps> = ({ children, username, onClick }) => (
  <NextLink href="/user/[username]" as={`/user/${username}`} shallow passHref>
    <Link color="inherit" onClick={onClick}>
      {children}
    </Link>
  </NextLink>
);

const ContentInfo: FC<Props> = ({ username, avatar, date, ...props }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const closeModal = useCallback(() => {
    dispatch(setModal(false));
  }, []);
  const isNotSkeleton = typeof username === "string";
  return (
    <CardHeader
      avatar={
        isNotSkeleton ? (
          <LinkToUser username={username as string} onClick={closeModal}>
            <Avatar src={avatar as string}>{username[0]}</Avatar>
          </LinkToUser>
        ) : (
          avatar
        )
      }
      title={
        <LinkToUser
          username={isNotSkeleton ? (username as string) : ""}
          onClick={closeModal}
        >
          {username}
        </LinkToUser>
      }
      subheader={date}
      {...props}
    />
  );
};

export default ContentInfo;
