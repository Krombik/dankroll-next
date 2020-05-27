import * as actionIs from '../interfaces/actions.interfaces';

export enum actionTypes {
  FAILURE = 'FAILURE',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  RESET = 'RESET',
  LOAD_ALL_POSTS_LIST = 'LOAD_ALL_POST_LIST',
  LOAD_ALL_POSTS_LIST_SUCCESS = 'LOAD_ALL_POST_LIST_SUCCESS',
  LOAD_POST = 'LOAD_POST',
  LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS',
  START_CLOCK = 'START_CLOCK',
  TICK_CLOCK = 'TICK_CLOCK',
}

export type Action =
  | actionIs.Failure
  | actionIs.Increment
  | actionIs.Decrement
  | actionIs.Reset
  | actionIs.LoadAllPostsList
  | actionIs.LoadAllPostsListSuccess
  | actionIs.LoadPost
  | actionIs.LoadPostSuccess
  | actionIs.StartClock
  | actionIs.TickClock;
