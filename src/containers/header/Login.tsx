import { FC, useState, ChangeEvent, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { loginUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setAuthorized } from "../../redux/common/actions";
import { setCookie } from "nookies";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

type Props = {
  openModal: (e: any) => void;
  closeModal: () => void;
};

const Login: FC<Props> = ({ openModal, closeModal }) => {
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
  const handleLogin = async () => {
    setLoading(true);
    const { user } = await loginUser(email, password);
    if (user) {
      dispatch(setAuthorized(user.token, user.username));
      setCookie(null, "token", user.token, { path: "/" });
    }
    setLoading(false);
    closeModal();
  };
  return (
    <ValidatorForm onSubmit={handleLogin}>
      <Grid container justify="center" alignItems="center" spacing={3}>
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
          onClick={openModal}
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
      </Grid>
    </ValidatorForm>
  );
};

export default Login;
