import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

import { loadAllPostsList, startClock, tickClock } from '../actions';
import Page from '../components/page';
import { WithReduxNextPageContext } from '../interfaces';

const Index: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startClock());
  });

  return <Page title="Index Page" />;
};

Index.getInitialProps = async ({
  store,
  req,
}: WithReduxNextPageContext): Promise<{ isServer: boolean }> => {
  const isServer = !!req;
  store.dispatch(tickClock(isServer));
  if (!store.getState().allPostsList)
    store.dispatch(loadAllPostsList());
  return { isServer };
};

export default Index;
