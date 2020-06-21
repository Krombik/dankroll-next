import { combineReducers } from "redux";
import articleTabs from "./articleTabs/reducer";
import common from "./common/reducer";
import articleModal from "./articleModal/reducer";

export const combinedReducer = combineReducers({
  articleTabs,
  common,
  articleModal,
});
