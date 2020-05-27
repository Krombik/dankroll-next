import { actionTypes, Action } from './actions/types';
import { State } from './interfaces';

export const exampleInitialState: State = {
  count: 0,
  error: null,
  lastUpdate: 0,
  light: false,
  allPostsList: null,
  post: null
};

const reducer = (state = exampleInitialState, action: Action): State => {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.payLoad },
      };

    case actionTypes.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 },
      };

    case actionTypes.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 },
      };

    case actionTypes.RESET:
      return {
        ...state,
        ...{ count: exampleInitialState.count },
      };

    case actionTypes.LOAD_ALL_POSTS_LIST_SUCCESS:
      return {
        ...state,
        ...{ allPostsList: action.payLoad },
      };

    case actionTypes.LOAD_POST_SUCCESS:
      return {
        ...state,
        ...{ post: action.payLoad },
      };

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.payLoad.ts, light: !!action.payLoad.light },
      };

    default:
      return state;
  }
};

export default reducer;
