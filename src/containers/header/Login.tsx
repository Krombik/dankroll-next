import { FC, useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { loginUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setAuthorized } from "../../redux/common/actions";

type Props = {
  openModal: () => void;
  closeModal: () => void;
};

const Login: FC<Props> = ({ openModal, closeModal }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    setLoading(true);
    const { user } = await loginUser(email, password);
    if (user) dispatch(setAuthorized(user.token));
    setLoading(false);
    closeModal();
  };
  return (
    <>
      <Grid item>
        <Typography variant="h4">Sign in</Typography>
      </Grid>
      <Link
        underline="always"
        variant="body2"
        color="inherit"
        component="button"
        onClick={openModal}
      >
        Need an account?
      </Link>
      <Grid item>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={handleEmail}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          variant="outlined"
          onChange={handlePassword}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Grid>
    </>
  );
};

export default Login;
