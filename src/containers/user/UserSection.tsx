import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { FC, useEffect } from "react";
import { useRequest } from "@/utils/useRequest";
import { UserObj } from "@/types/user";
import { State, FetchRV, ThunkDispatcher } from "@/types";
import Spinner from "@/components/common/Spinner";
import Banner from "../common/Banner";
import UserSubscribeButton from "./UserSubscribeButton";
import UserSettingsButton from "./UserSettingsButton";
import { getUserUrl } from "@/api/user";
import { setError } from "@/redux/error/actions";
import { useRouter } from "next/router";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (state: State) => state.authentication.currentUserName,
  (token, currentUserName) => ({ token, currentUserName })
);

type Props = {
  initialUser: FetchRV<UserObj>;
};

const UserSection: FC<Props> = ({ initialUser }) => {
  const { token, currentUserName } = useSelector(selectData);
  const {
    query: { username },
  } = useRouter();
  const { data = initialUser, mutate } = useRequest<UserObj>(
    [getUserUrl(username as string), token],
    initialUser
  );
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data));
  });
  if (!data) return <Spinner />;
  const user = data.profile;
  if (data.status || !user) return null;
  return (
    <Banner alignItems="center" direction="column">
      <Grid item>
        <Avatar src={user.image} sizes="large">
          {user.username[0]}
        </Avatar>
      </Grid>
      <Grid item container alignItems="center" justify="center">
        <Grid item>
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
      </Grid>
      {user.bio && (
        <Grid item color="textPrimary">
          <Typography color="textPrimary">{user.bio}</Typography>
        </Grid>
      )}
    </Banner>
  );
};

export default UserSection;
