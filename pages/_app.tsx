import App, { AppContext, AppInitialProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../store';
import { WithSagaTaskStore } from '../interfaces';
import Layout from '../components/Layout';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'OpenSans';
    src: local('OpenSans'), url('/fonts/OpenSans-Bold.woff2') format('woff2'),
      url('/fonts/OpenSans-Bold.woff') format('woff'),
      url('/fonts/OpenSans-Bold.eot') format('eot'),
      url('/fonts/OpenSans-Bold.svg') format('svg'),
      url('/fonts/OpenSans-Bold.ttf') format('ttf');
    font-weight: bold;
    font-style: normal;
  }
  @font-face {
    font-family: 'OpenSans';
    src: local('OpenSans'), url('/fonts/OpenSans-SemiBold.woff2') format('woff2'),
      url('/fonts/OpenSans-SemiBold.woff') format('woff'),
      url('/fonts/OpenSans-SemiBold.eot') format('eot'),
      url('/fonts/OpenSans-SemiBold.svg') format('svg'),
      url('/fonts/OpenSans-SemiBold.ttf') format('ttf');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'OpenSans';
    src: local('OpenSans'), url('/fonts/OpenSans-Regular.woff2') format('woff2'),
      url('/fonts/OpenSans-Regular.woff') format('woff'),
      url('/fonts/OpenSans-Regular.eot') format('eot'),
      url('/fonts/OpenSans-Regular.svg') format('svg'),
      url('/fonts/OpenSans-Regular.ttf') format('ttf');
    font-weight: 400;
    font-style: normal;
  }
  body {
    font-family: 'OpenSans' !important;
  }
`;

interface MyAppProps {
  store: WithSagaTaskStore;
}

class MyApp extends App<MyAppProps> {
  static async getInitialProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render(): JSX.Element {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
