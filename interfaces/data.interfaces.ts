import { Store } from 'redux';
import { Task } from 'redux-saga';
import { NextPageContext } from 'next';

export interface WithSagaTaskStore extends Store {
  sagaTask?: Task;
}

export interface WithReduxNextPageContext extends NextPageContext {
  store: WithSagaTaskStore; // Added with react-redux Provider in _app.tsx
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
};

export interface State {
  count: number;
  error: null | Error;
  lastUpdate: number;
  light: boolean;
  allPostsList: Post[] | null;
  post: OpenPost | null
}
