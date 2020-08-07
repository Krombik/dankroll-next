import { FC, useState, ChangeEvent, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { loginUser } from "@/api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "@/types";
import { setError } from "@/redux/error/actions";
import { setAuthorized } from "@/redux/authentication/actions";
import { setCookie } from "nookies";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setModal } from "@/redux/modal/actions";
import Gutter from "@/components/common/Gutter";

const Login: FC = () => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const openRegister = useCallback(() => {
    dispatch(setModal(true, "register"));
  }, []);
  const handleLogin = async () => {
    setLoading(true);
    const data = await loginUser(email, password);
    if (data.user) {
      dispatch(setAuthorized(data.user.token, data.user.username));
      setCookie(null, "token", data.user.token, { path: "/" });
      dispatch(setModal(false));
    } else {
      dispatch(setError(true, data));
    }
    setLoading(false);
  };
  return (
    <Gutter
      justify="center"
      alignItems="center"
      component={ValidatorForm}
      componentProps={{ onSubmit: handleLogin, autoComplete: "off" }}
      maxWidth="sm"
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Sign in
        </Typography>
      </Grid>
      <Link
        underline="always"
        variant="body2"
        color="inherit"
        component="button"
        name="register"
        onClick={openRegister}
      >
        Need an account?
      </Link>
      <Grid item xs={12}>
        <TextValidator
          value={email}
          label="Email"
          type="email"
          name="email"
          variant="outlined"
          onChange={handleEmail}
          fullWidth
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          value={password}
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          onChange={handlePassword}
          fullWidth
          validators={["required"]}
          errorMessages={["this field is required"]}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          Login
        </Button>
      </Grid>
    </Gutter>
  );
};

export default Login;
