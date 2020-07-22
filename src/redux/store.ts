import { createStore, applyMiddleware, Middleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducer";
import { State } from "../types";
import { Actions } from "../types/actions";
import { persistStore, REHYDRATE } from "redux-persist";

const bindMiddleware = (middleware: Middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(middleware));
  }
  return applyMiddleware(middleware);
};

const reducer = (state: State, action: Actions) => {
  if (action.type === HYDRATE) {
    delete action.payload.modal;
    return { ...state, ...action.payload };
  }
  if (action.type === REHYDRATE) {
    const clientTabList: string[] = (action.payload as any).tabList;
    if (clientTabList) {
      (action.payload as any).tabPages = {
        ...Object.fromEntries(clientTabList.map((key) => [key, 0])),
        ...state.articleTabs.tabPages,
      };
      const serverTab = state.articleTabs.tabList[0];
      if (serverTab && !clientTabList.includes(serverTab))
        clientTabList.push(serverTab);
    }
  }
  return combinedReducer(state, action);
};

const initStore = () => {
  const store: any = createStore(reducer, bindMiddleware(thunkMiddleware));
  if (typeof window !== "undefined") store.__persistor = persistStore(store);
  return store;
};

export const wrapper = createWrapper<State, Actions>(initStore);
