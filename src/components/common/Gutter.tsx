import Container from "@material-ui/core/Container";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { FC } from "react";

const Gutter = <C extends React.ElementType>({
  children,
  justify,
  direction,
  alignItems,
  ...props
}: Omit<GridProps<C, { component?: C }>, "object">) => (
  <Grid {...props} item xs={12}>
    <Container maxWidth="lg" disableGutters>
      <Grid
        container
        justify={justify}
        direction={direction}
        alignItems={alignItems}
        spacing={3}
      >
        {children}
      </Grid>
    </Container>
  </Grid>
);

export default Gutter;
