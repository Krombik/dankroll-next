import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FC } from "react";

const Spinner: FC = () => (
  <Grid
    item
    css={`
      margin-top: 25px;
      margin-bottom: 25px;
    `}
    container
    justify="center"
  >
    <CircularProgress />
  </Grid>
);

export default Spinner;
