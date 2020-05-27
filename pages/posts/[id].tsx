import React from 'react';
import { NextPage } from 'next';
import { loadPost } from '../../actions';
import Post from '../../components/Post';
import { WithReduxNextPageContext } from '../../interfaces';

const PostPage: NextPage = () => {
    return <Post />;
};

PostPage.getInitialProps = async ({
    store,
    query,
}: WithReduxNextPageContext): Promise<void> => {
    if (!store.getState().post)
        store.dispatch(loadPost(+query.id));
};


export default PostPage;
