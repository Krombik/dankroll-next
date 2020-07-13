import { FC, useState, ChangeEvent, useCallback } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { registerUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setAuthorized, setError } from "../../redux/common/actions";
import { setCookie } from "nookies";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { setModal } from "../../redux/modal/actions";

type Props = {
  openModal: (e: any) => void;
};

const Register: FC<Props> = ({ openModal }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);
  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);
  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);
  const handleRegister = async () => {
    setLoading(true);
    const data = await registerUser(username, email, password);
    if (data.user) {
      dispatch(setAuthorized(data.user.token, data.user.username));
      setCookie(null, "token", data.user.token, { path: "/" });
      dispatch(setModal(false));
    } else {
      dispatch(setError(true, data.status, data.errors));
    }
    setLoading(false);
  };
  return (
    <ValidatorForm onSubmit={handleRegister}>
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4">
            Sign up
          </Typography>
        </Grid>
        <Link
          underline="always"
          variant="body2"
          color="inherit"
          component="button"
          name="login"
          onClick={openModal}
        >
          Have an account?
        </Link>
        <Grid item xs={12}>
          <TextValidator
            value={username}
            label="Username"
            name="username"
            variant="outlined"
            onChange={handleUsername}
            fullWidth
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
        </Grid>
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
            type="submit"
            color="primary"
            disabled={loading}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </ValidatorForm>
  );
};

export default Register;
