import { actionTypes, Action } from './actions/types';
import { State } from './interfaces';

export const exampleInitialState: State = {
  error: null,
  allPostsList: null,
  post: null
}

const reducer = (state = exampleInitialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.FAILURE:
      return ({
        ...state,
        error: action.payLoad,
      });
    case actionTypes.LOAD_ALL_POSTS_LIST_SUCCESS:
      return ({
        ...state,
        allPostsList: action.payLoad,
      });
    case actionTypes.LOAD_POST_SUCCESS:
      return ({
        ...state,
        post: action.payLoad
      });
    default:
      return state;
  }
}

export default reducer;
