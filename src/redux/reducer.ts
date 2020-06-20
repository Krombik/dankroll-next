import { combineReducers } from "redux";
import article from "./article/reducer";
import common from "./common/reducer";
import articleModal from "./articleModal/reducer";

export const combinedReducer = combineReducers({
  article,
  common,
  articleModal,
});
