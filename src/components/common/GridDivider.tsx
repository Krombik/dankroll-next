import styled from "styled-components";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const _GridDivider = (props: GridProps) => (
  <Grid {...props}>
    <Divider />
  </Grid>
);

const GridDivider = styled(_GridDivider)`
  padding-right: 0 !important;
  padding-left: 0 !important;
`;

export default GridDivider;
