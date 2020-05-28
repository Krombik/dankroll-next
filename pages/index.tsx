import { NextPage } from 'next';
import { loadAllPostsList } from '../actions';
import Home from '../components/Home';
import { WithReduxNextPageContext } from '../interfaces';

const Index: NextPage = () => <Home />;

Index.getInitialProps = async ({ store }: WithReduxNextPageContext): Promise<void> => {
  if (!store.getState().allPostsList) store.dispatch(loadAllPostsList());
};

export default Index;
