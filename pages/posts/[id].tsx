import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { loadPost, startClock, tickClock } from '../../actions';
import PostPage from '../../components/PostPage';
import { WithReduxNextPageContext } from '../../interfaces';
// import { useRouter } from 'next/router'

const Post: NextPage = () => {
    return <PostPage />;
};

Post.getInitialProps = async ({
    store,
    query,
}: WithReduxNextPageContext): Promise<void> => {
    if (!store.getState().Post)
        store.dispatch(loadPost(+query.id));
    // console.log(useRouter())
};


export default Post;
