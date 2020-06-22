import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ContentInfo from "./ContentInfo";

type Props = {
  body: string;
  username: string;
  avatar: string;
  date: string;
};

const Comment: FC<Props> = ({ body, username, avatar, date }) => (
  <Card>
    <CardContent>
      <Typography variant="body1">{body}</Typography>
    </CardContent>
    <Divider />
    <ContentInfo avatar={avatar} username={username} date={date} />
  </Card>
);

export default Comment;
