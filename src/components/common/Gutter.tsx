import Container, { ContainerProps } from "@material-ui/core/Container";
import Grid, { GridProps } from "@material-ui/core/Grid";

const Gutter = <C extends React.ElementType>({
  children,
  maxWidth = "lg",
  justify,
  direction,
  wrap,
  alignItems,
  ...props
}: Omit<GridProps<C, { component?: C }>, "object"> &
  Pick<ContainerProps, "maxWidth">) => (
  <Grid {...props} item container justify="center" xs={12}>
    <Grid
      item
      container
      spacing={3}
      component={Container}
      disableGutters
      maxWidth={maxWidth}
      justify={justify}
      direction={direction}
      wrap={wrap}
      alignItems={alignItems}
    >
      {children}
    </Grid>
  </Grid>
);

export default Gutter;
