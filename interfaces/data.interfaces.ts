import { Store } from 'redux';
import { Task } from 'redux-saga';
import { NextPageContext } from 'next';

export interface WithSagaTaskStore extends Store {
  sagaTask?: Task;
}

export interface WithReduxNextPageContext extends NextPageContext {
  store: WithSagaTaskStore;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface Comment {
  body: string;
  id: number;
  postId: number;
}

export interface OpenPost extends Post {
  comments: Comment[];
}

export interface State {
  error: null | Error;
  allPostsList: Post[] | null;
  post: OpenPost | null
}
