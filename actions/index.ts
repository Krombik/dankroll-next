import { Post, OpenPost } from '../interfaces';
import { actionTypes } from './types';
import * as actionIs from '../interfaces/actions.interfaces';

export function failure(error: Error): actionIs.Failure {
  return ({
    type: actionTypes.FAILURE,
    payLoad: error,
  });
}

export function loadAllPostsList(): actionIs.LoadAllPostsList {
  return ({ type: actionTypes.LOAD_ALL_POSTS_LIST });
}

export function loadAllPostsListSuccess(data: Post[]): actionIs.LoadAllPostsListSuccess {
  return ({
    type: actionTypes.LOAD_ALL_POSTS_LIST_SUCCESS,
    payLoad: data,
  });
}

export function loadPost(id: number): actionIs.LoadPost {
  return ({ type: actionTypes.LOAD_POST, payLoad: id });
}

export function loadPostSuccess(data: OpenPost): actionIs.LoadPostSuccess {
  return ({
    type: actionTypes.LOAD_POST_SUCCESS,
    payLoad: data,
  });
}