import { combineReducers } from "redux";
import articleTabs from "./articleTabs/reducer";
import common from "./common/reducer";
import modal from "./modal/reducer";

export const combinedReducer = combineReducers({
  articleTabs,
  common,
  modal,
});
