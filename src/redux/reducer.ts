import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import articleTabsReducer from "./articleTabs/reducer";
import commonReducer from "./common/reducer";
import modalReducer from "./modal/reducer";
import authenticationReducer from "./authentication/reducer";
import errorReducer from "./error/reducer";

const articleTabsConfig = {
  key: "tab-list",
  storage: storage,
  whitelist: ["tabList"],
};

const commonConfig = {
  key: "dark",
  storage: storage,
  whitelist: ["dark"],
};

export const combinedReducer = combineReducers({
  articleTabs: persistReducer(articleTabsConfig, articleTabsReducer),
  common: persistReducer(commonConfig, commonReducer),
  modal: modalReducer,
  authentication: authenticationReducer,
  error: errorReducer,
});
