import NewPostModal from './NewPostModal';
import Router, { useRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Logo = styled.a`
  font-weight: bold;
  font-size: 25px;
  color: white;
  opacity: 0.95;
  transition: 0.2ms;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    opacity: 1;
  }
`;

const Head = styled.header`
  margin-bottom: 50px;
  position: relative;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
    Router.push(pathname, '/posts/new', { shallow: true });
  };
  const handleClose = () => {
    setOpen(false);
    Router.back();
  };
  return (
    <Head>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Link as="/" href="/">
          <Logo>Blog-Test</Logo>
        </Link>
        <Button
          variant="contained"
          color="primary"
          disabled={pathname === '/posts/new'}
          onClick={handleClickOpen}
        >
          Create new post
        </Button>
        <NewPostModal onClose={handleClose} open={open} />
      </Grid>
    </Head>
  );
};

export default Header;
