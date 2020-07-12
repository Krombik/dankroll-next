import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { FC } from "react";
import { useInitialSWR } from "../../utils/useInitialSWR";
import { UserObj } from "../../types/user";
import fetcher from "../../utils/fetcher";
import { State, FetchRV } from "../../types";
import Spinner from "../../components/common/Spinner";
import Banner from "../common/Banner";
import UserSubscribeButton from "./UserSubscribeButton";
import UserSettingsButton from "./UserSettingsButton";
import { getUserUrl } from "../../api/user";

const selectData = createSelector(
  (state: State) => state.common.token,
  (state: State) => state.common.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

type Props = {
  initialUser: FetchRV<UserObj>;
  username: string;
};

const UserSection: FC<Props> = ({ initialUser, username }) => {
  const { token, currentUserName } = useSelector(selectData);
  const { data = initialUser, mutate } = useInitialSWR<FetchRV<UserObj>>(
    [getUserUrl(username), token],
    fetcher.get,
    initialUser
  );
  const user = data?.profile;
  if (!user) return <Spinner />;
  return (
    <Grid item xs={12}>
      <Banner>
        <Grid item container justify="center">
          <Avatar src={user.image} sizes="large">
            {user.username[0]}
          </Avatar>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="h2" color="textPrimary">
            {user.username}
            {user.username !== currentUserName ? (
              <UserSubscribeButton
                token={token}
                username={user.username}
                follow={user.following}
                mutate={mutate}
              />
            ) : (
              <UserSettingsButton />
            )}
          </Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography color="textPrimary">{user.bio}</Typography>
        </Grid>
      </Banner>
    </Grid>
  );
};

export default UserSection;
