import { FC, useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { registerUser } from "../../api/user";
import { useDispatch } from "react-redux";
import { ThunkDispatcher } from "../../types";
import { setAuthorized } from "../../redux/common/actions";

type Props = {
  openModal: () => void;
  closeModal: () => void;
};

const Register: FC<Props> = ({ openModal, closeModal }) => {
  const dispatch = useDispatch<ThunkDispatcher>();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRegister = async () => {
    setLoading(true);
    const data: any = await registerUser(username, email, password);
    if (data?.user) dispatch(setAuthorized(data.user.token));
    setLoading(false);
    closeModal();
  };
  return (
    <>
      <Grid item>
        <Typography variant="h4">Sign up</Typography>
      </Grid>
      <Link
        underline="always"
        variant="body2"
        color="inherit"
        component="button"
        onClick={openModal}
      >
        Have an account?
      </Link>
      <Grid item>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={handleUsername}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </Grid>
    </>
  );
};

export default Register;
