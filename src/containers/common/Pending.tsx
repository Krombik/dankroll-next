import Grid from "@material-ui/core/Grid";
import { FC } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

type Props = {
  isLoading: boolean;
};

const Pending: FC<Props> = ({ children, isLoading }) =>
  isLoading ? (
    <Grid item xs={12} container justify="center">
      <CircularProgress />
    </Grid>
  ) : (
    <>{children}</>
  );

export default Pending;
