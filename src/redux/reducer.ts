import { combineReducers } from "redux";
import article from "./article/reducer";
import common from "./common/reducer";

export const combinedReducer = combineReducers({
  article,
  common,
});
