import {
  FC,
  useState,
  ChangeEvent,
  useCallback,
  useRef,
  useEffect,
} from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { updateCurrentUser, getCurrentUser } from "../../api/user";
import { setError } from "../../redux/error/actions";
import { setAuthorized } from "../../redux/authentication/actions";
import { setCookie } from "nookies";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setModal } from "../../redux/modal/actions";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";
import { State, ThunkDispatcher, FetchRV } from "../../types";
import useSWR from "swr";
import {
  AuthorizedUserObj,
  AuthorizedUserType,
  UpdateUser,
} from "../../types/user";
import Router from "next/router";

const selectData = createSelector(
  (state: State) => state.authentication.token,
  (token) => ({ token })
);

const Settings: FC = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const { token } = useSelector(selectData);
  const { data, mutate } = useSWR<FetchRV<AuthorizedUserObj>>(
    token,
    getCurrentUser,
    {
      revalidateOnFocus: false,
    }
  );
  const currUserData = useRef<AuthorizedUserType | null>(null);
  const dispatch = useDispatch<ThunkDispatcher>();
  useEffect(() => {
    if (data?.status) dispatch(setError(true, data));
  });
  if (!currUserData.current && data?.user) currUserData.current = data.user;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (data?.user)
      mutate(
        {
          user: { ...data.user, [e.currentTarget.name]: e.currentTarget.value },
        },
        false
      );
  };
  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  }, []);
  const handleSettings = async () => {
    setLoading(true);
    const newUserData: Partial<UpdateUser> = {};
    if (currUserData.current && data?.user) {
      if (currUserData.current.username !== data.user.username)
        newUserData.username = data.user.username;
      if (currUserData.current.email !== data.user.email)
        newUserData.email = data.user.email;
      if (currUserData.current.bio != data.user.bio)
        newUserData.bio = data.user.bio;
      if (currUserData.current.image != data.user.image)
        newUserData.image = data.user.image as string;
    }
    if (password.length > 0) newUserData.password = password;
    if (Object.keys(newUserData).length > 0) {
      const data = await updateCurrentUser(newUserData, token);
      if (data.user) {
        currUserData.current = null;
        await Router.replace("/user/[value]", `/user/${data.user.username}`, {
          shallow: true,
        });
        dispatch(setAuthorized(data.user.token, data.user.username));
        setCookie(null, "token", data.user.token, { path: "/" });
        dispatch(setModal(false));
      } else {
        dispatch(setError(true, data));
      }
    }
    setLoading(false);
  };
  return (
    <ValidatorForm onSubmit={handleSettings} autoComplete="off">
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Settings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            value={data?.user?.image || ""}
            disabled={!data?.user}
            label="Avatar url"
            name="image"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextValidator
            disabled={!data?.user}
            value={data?.user?.username || ""}
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
            disabled={!data?.user}
            value={data?.user?.bio || ""}
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
            disabled={!data?.user}
            value={data?.user?.email || ""}
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
            disabled={!data?.user}
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
            disabled={loading || !data?.user}
          >
            Update profile
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default Settings;
