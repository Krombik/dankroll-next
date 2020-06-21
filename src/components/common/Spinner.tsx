import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FC } from "react";

const _Spinner: FC = (props) => (
  <Grid item xs={12} {...props} container justify="center">
    <CircularProgress />
  </Grid>
);

const Spinner = styled(_Spinner)`
  margin-top: 25px;
  margin-bottom: 25px;
`;

export default Spinner;
