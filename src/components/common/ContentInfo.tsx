import { FC } from "react";
import CardHeader, { CardHeaderProps } from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";

type Props = CardHeaderProps & {
  username: string | JSX.Element;
  avatar: string | JSX.Element;
  date: string | JSX.Element;
};

const ContentInfo: FC<Props> = ({ username, avatar, date, ...props }) => (
  <CardHeader
    avatar={
      typeof avatar === "string" ? (
        <Avatar src={avatar}>{username[0]}</Avatar>
      ) : (
        avatar
      )
    }
    title={username}
    subheader={typeof date === "string" ? new Date(date).toDateString() : date}
    {...props}
  />
);

export default ContentInfo;
