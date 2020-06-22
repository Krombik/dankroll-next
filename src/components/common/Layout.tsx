import Footer from "./FooterComponent";
import Container from "@material-ui/core/Container";
import { FC } from "react";
import Header from "../../containers/common/Header";

const Layout: FC = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="lg">
      {children}
      <Footer />
    </Container>
  </>
);

export default Layout;
