import React from 'react';
import { NextPage } from 'next';
import { loadPost } from '../../actions';
import { WithReduxNextPageContext } from '../../interfaces';
import NewPost from '../../components/NewPost'

const PostPage: NextPage = () => {
    return <NewPost />;
};

// PostPage.getInitialProps = async ({
//     store,
//     query,
// }: WithReduxNextPageContext): Promise<void> => {
//     if (!store.getState().Post)
//         store.dispatch(loadPost(+query.id));
// };


export default PostPage;
