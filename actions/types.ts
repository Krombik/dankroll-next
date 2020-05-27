import * as actionIs from '../interfaces/actions.interfaces';

export enum actionTypes {
  FAILURE = 'FAILURE',
  LOAD_ALL_POSTS_LIST = 'LOAD_ALL_POST_LIST',
  LOAD_ALL_POSTS_LIST_SUCCESS = 'LOAD_ALL_POST_LIST_SUCCESS',
  LOAD_POST = 'LOAD_POST',
  LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS',
}

export type Action =
  actionIs.Failure
  | actionIs.LoadAllPostsList
  | actionIs.LoadAllPostsListSuccess
  | actionIs.LoadPost
  | actionIs.LoadPostSuccess;
