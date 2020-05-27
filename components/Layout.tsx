import Header from './Header';

const Layout = ({ children }) => (
    <div className="main-container">
        <Header />
        <div className="content-wrapper">{children}</div>
    </div>
);

export default Layout;