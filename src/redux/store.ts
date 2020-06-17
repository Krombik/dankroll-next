import { createStore, applyMiddleware, Middleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducers";
import { State } from "../types";
import { Actions } from "../types/actions";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state: State, action: Actions) => {
  if (action.type === HYDRATE) {
    const newState = { ...state, ...action.payload };
    if (state.article.tabList.length > action.payload.article.tabList.length)
      return { ...newState, article: { ...state.article } };
    return newState;
  }
  return combinedReducer(state, action);
};

const initStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper<State, Actions>(initStore);
