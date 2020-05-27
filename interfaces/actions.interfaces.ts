import { actionTypes } from '../actions/types';
import { Post, OpenPost } from './index';

export interface Failure {
  type: actionTypes.FAILURE;
  payLoad: Error;
}

export interface Increment {
  type: actionTypes.INCREMENT;
}

export interface Decrement {
  type: actionTypes.DECREMENT;
}

export interface Reset {
  type: actionTypes.RESET;
}

export interface LoadAllPostsList {
  type: actionTypes.LOAD_ALL_POSTS_LIST;
}

export interface LoadAllPostsListSuccess {
  type: actionTypes.LOAD_ALL_POSTS_LIST_SUCCESS;
  payLoad: Post[];
}

export interface LoadPost {
  type: actionTypes.LOAD_POST;
  payLoad: number;
}

export interface LoadPostSuccess {
  type: actionTypes.LOAD_POST_SUCCESS;
  payLoad: OpenPost;
}

export interface StartClock {
  type: actionTypes.START_CLOCK;
}

export interface TickClock {
  type: actionTypes.TICK_CLOCK;
  payLoad: {
    light: boolean;
    ts: number;
  }
}
