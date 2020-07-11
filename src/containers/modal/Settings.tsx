import { FC, useState, ChangeEvent, useCallback, useRef } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { updateCurrentUser, getCurrentUser } from "../../api/user";
import { setAuthorized } from "../../redux/common/actions";
import { setCookie } from "nookies";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setModal } from "../../redux/modal/actions";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher } from "../../types";
import useSWR from "swr";
import {
  AuthorizedUserObj,
  AuthorizedUserType,
  UpdateUser,
} from "../../types/user";
import Router from "next/router";

const selectData = createSelector(
  (state: State) => state.common.token,
  (token) => ({ token })
);

const Settings: FC = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { token } = useSelector(selectData);
  const {
    data = {
      user: { image: "", bio: "", username: "", email: "" },
    } as AuthorizedUserObj,
    mutate,
  } = useSWR(token, getCurrentUser, {
    revalidateOnFocus: false,
  });
  const prevUser = useRef<AuthorizedUserType>(null);
  if (data?.user && data.user.image === null) data.user.image = "";
  if (!prevUser.current && data.user.username)
    prevUser.current = { ...data.user };
  const dispatch = useDispatch<ThunkDispatcher>();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      mutate(
        {
          user: { ...data.user, [e.currentTarget.name]: e.currentTarget.value },
        },
        false
      );
    },
    [data]
  );
  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }, []);
  const handleSettings = async () => {
    setLoading(true);
    const updateUser: Partial<UpdateUser> = {};
    if (prevUser.current.username !== data.user.username)
      updateUser.username = data.user.username;
    if (prevUser.current.email !== data.user.email)
      updateUser.email = data.user.email;
    if (prevUser.current.bio !== data.user.bio) updateUser.bio = data.user.bio;
    if (prevUser.current.image !== data.user.image)
      updateUser.image = data.user.image;
    if (password.length > 0) updateUser.password = password;
    if (Object.keys(updateUser).length > 0) {
      const { user } = await updateCurrentUser(updateUser, token);
      if (user) {
        prevUser.current = null;
        await Router.replace("/user/[value]", `/user/${user.username}`, {
          shallow: true,
        });
        dispatch(setAuthorized(user.token, user.username));
        setCookie(null, "token", user.token, { path: "/" });
        dispatch(setModal(false));
      }
    }
    setLoading(false);
  };
  return (
    <ValidatorForm onSubmit={handleSettings}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={data?.user.image}
            label="Avatar url"
            name="image"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={data?.user.username}
            label="Username"
            name="username"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={data?.user.bio}
            label="Bio"
            name="bio"
            variant="outlined"
            onChange={handleChange}
            multiline
            rows={5}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={data?.user.email}
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            validators={["required", "isEmail"]}
            errorMessages={["this field is required", "email is not valid"]}
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={password}
            label="New password"
            type="password"
            name="password"
            variant="outlined"
            onChange={handlePassword}
            fullWidth
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={loading}
          >
            Update profile
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default Settings;
