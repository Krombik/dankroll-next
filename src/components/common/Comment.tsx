import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ContentInfo from "./ContentInfo";

type Props = {
  body: string;
  username: string;
  avatar: string;
  date: string;
};

const Comment: FC<Props> = ({ body, username, avatar, date }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
      <Divider />
      <ContentInfo avatar={avatar} username={username} date={date} />
    </Card>
  );
};

export default Comment;
