import { FC } from "react";
import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";

type Props = CardHeaderProps & {
  username: string | JSX.Element;
  avatar: string | JSX.Element;
  date: string | JSX.Element;
};

const ContentInfo: FC<Props> = ({ username, avatar, date, ...props }) => (
  <CardHeader
    avatar={
      typeof avatar === "string" ? (
        <NextLink
          href="/user/[username]"
          as={`/user/${username}`}
          shallow
          passHref
        >
          <Link>
            <Avatar src={avatar}>{username[0]}</Avatar>
          </Link>
        </NextLink>
      ) : (
        avatar
      )
    }
    title={
      <NextLink
        href="/user/[username]"
        as={`/user/${username}`}
        shallow
        passHref
      >
        <Link color="inherit">{username}</Link>
      </NextLink>
    }
    subheader={date}
    {...props}
  />
);

export default ContentInfo;
