import { createStore, applyMiddleware, Middleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducer";
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
    if (
      state.articleTabs.tabList.length >
      action.payload.articleTabs.tabList.length
    )
      return { ...newState, articleTabs: { ...state.articleTabs } };
    return newState;
  }
  return combinedReducer(state, action);
};

const initStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper<State, Actions>(initStore);
