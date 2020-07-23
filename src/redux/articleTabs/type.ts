export enum ActionTypes {
  SET_OFFSET = "SET_OFFSET",
  SERVER_SET_OFFSET = "SERVER_SET_OFFSET",
  ADD_TAB = "ADD_TAB",
  REMOVE_TAB = "REMOVE_TAB",
  MOVE_TAB = "MOVE_TAB",
  SET_PAGE_NUMBER = "SET_PAGE_NUMBERS",
}

export type TabPagesType = { [key: string]: number };

type SetOffset = {
  type: ActionTypes.SET_OFFSET;
  payload: { offset: number; tabPages: TabPagesType };
};

type ServerSetOffset = {
  type: ActionTypes.SERVER_SET_OFFSET;
  payload: number;
};

type AddTab = {
  type: ActionTypes.ADD_TAB;
  payload: string;
};

type RemoveTab = {
  type: ActionTypes.REMOVE_TAB;
  payload: string;
};

type MoveTab = {
  type: ActionTypes.MOVE_TAB;
  payload: string[];
};

type SetPageNumber = {
  type: ActionTypes.SET_PAGE_NUMBER;
  payload: TabPagesType;
};

export type ArticleActions =
  | SetOffset
  | ServerSetOffset
  | AddTab
  | RemoveTab
  | MoveTab
  | SetPageNumber;
