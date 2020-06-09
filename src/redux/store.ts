import { createStore, applyMiddleware, AnyAction, Middleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducers";
import { State } from "../types";

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state: State, action: AnyAction) =>
  action.type === HYDRATE
    ? {
        ...state,
        ...action.payload,
      }
    : combinedReducer(state, action);

const initStore = () => createStore(reducer, bindMiddleware([thunkMiddleware]));

export const wrapper = createWrapper<State>(initStore);
