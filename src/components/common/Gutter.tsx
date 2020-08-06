import Container, { ContainerProps } from "@material-ui/core/Container";
import Grid, { GridProps } from "@material-ui/core/Grid";

const Gutter = <C extends React.ElementType>({
  children,
  component,
  componentProps = {},
  ...props
}: GridProps &
  ContainerProps & {
    component?: C;
    componentProps?: React.ComponentProps<C> | {};
  }) => (
  <Grid
    component={component || "div"}
    {...componentProps}
    item
    container
    justify="center"
    xs={12}
  >
    <Grid
      item
      container
      spacing={3}
      component={Container}
      maxWidth="lg"
      disableGutters
      {...props}
    >
      {children}
    </Grid>
  </Grid>
);

export default Gutter;
