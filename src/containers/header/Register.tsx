import { FC, useState, ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

type Props = {
  setModal: () => void;
};

const Register: FC<Props> = ({ setModal }) => {
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
        onClick={setModal}
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
        <Button variant="contained" color="primary">
          Register
        </Button>
      </Grid>
    </>
  );
};

export default Register;
