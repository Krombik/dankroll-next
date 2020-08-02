import { combineReducers } from "redux";
import { persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import articleTabsReducer from "./articleTabs/reducer";
import commonReducer from "./common/reducer";
import modalReducer from "./modal/reducer";
import authenticationReducer from "./authentication/reducer";
import errorReducer from "./error/reducer";
import editorReducer from "./editor/reducer";

const articleTabsConfig: PersistConfig<any> = {
  key: "tab-list",
  storage: storage,
  whitelist: ["tabList"],
};

const commonConfig: PersistConfig<any> = {
  key: "dark",
  storage: storage,
  whitelist: ["dark"],
};

const editorConfig: PersistConfig<any> = {
  key: "editors",
  storage: storage,
  whitelist: ["editors"],
};

export const combinedReducer = combineReducers({
  articleTabs: persistReducer(articleTabsConfig, articleTabsReducer),
  common: persistReducer(commonConfig, commonReducer),
  modal: modalReducer,
  authentication: authenticationReducer,
  error: errorReducer,
  editor: persistReducer(editorConfig, editorReducer),
});
