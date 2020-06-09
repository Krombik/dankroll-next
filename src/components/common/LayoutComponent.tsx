import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Container from "@material-ui/core/Container";
import { FC } from "react";

const Layout: FC = ({ children }) => (
  <Container maxWidth="lg">
    <Header />
    {children}
    <Footer />
  </Container>
);

export default Layout;
