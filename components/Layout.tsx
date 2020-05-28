import Header from './Header';
import styled from 'styled-components';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme } from '@material-ui/core';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: green[500],
      contrastText: '#fff',
    },
  },
});

const Layout = styled.div`
  max-width: 1440px;
  padding: 25px 15px;
  margin: auto;
`;

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Layout>
      <Header />
      {children}
    </Layout>
  </ThemeProvider>
);
