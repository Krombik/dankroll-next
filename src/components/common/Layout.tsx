import { FC } from "react";
import Header from "@/containers/header/Header";
import Modal from "@/containers/modal/Modal";
import ErrorAlert from "@/containers/common/ErrorAlert";
import Grid from "@material-ui/core/Grid";

const Layout: FC = ({ children }) => (
  <>
    <Grid
      container
      spacing={3}
      css={`
        margin: 0;
        width: 100%;
        min-height: 100vh;
        height: 100%;
      `}
      direction="column"
    >
      <Header />
      {children}
    </Grid>
    <Modal />
    <ErrorAlert />
  </>
);

export default Layout;
