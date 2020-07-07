import Container from "@material-ui/core/Container";
import { FC } from "react";
import Header from "../../containers/header/Header";
import Modal from "../../containers/modal/Modal";

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="lg">{children}</Container>
    <Modal />
  </>
);

export default Layout;
