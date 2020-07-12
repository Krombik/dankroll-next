import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ContentInfo from "./ContentInfo";
import Grid from "@material-ui/core/Grid";
import TooltipIconButton from "./TooltipIconButton";
import DeleteIcon from "@material-ui/icons/Delete";

type Props = {
  body: string;
  username: string;
  avatar: string;
  date: string;
  onDelete?: (id: number) => void;
  id: number;
};

const Comment: FC<Props> = ({ body, username, avatar, date, onDelete, id }) => (
  <Card>
    <CardContent>
      <Typography variant="body1">{body}</Typography>
    </CardContent>
    <Divider />
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <ContentInfo avatar={avatar} username={username} date={date} />
      </Grid>
      {onDelete && (
        <Grid item>
          <TooltipIconButton
            tooltip={"Delete comment"}
            onClick={() => {
              onDelete(id);
            }}
          >
            <DeleteIcon />
          </TooltipIconButton>
        </Grid>
      )}
    </Grid>
  </Card>
);

export default Comment;
