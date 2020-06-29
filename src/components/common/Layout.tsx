import Container from "@material-ui/core/Container";
import { FC } from "react";
import Header from "../../containers/header/Header";

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="lg">{children}</Container>
  </>
);

export default Layout;
