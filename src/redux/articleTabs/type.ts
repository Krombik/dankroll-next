export enum ActionTypes {
  SET_OFFSET = "SET_OFFSET",
  SERVER_SET_OFFSET = "SERVER_SET_OFFSET",
  ADD_TAB = "ADD_TAB",
  SERVER_ADD_TAB = "SERVER_ADD_TAB",
  REMOVE_TAB = "REMOVE_TAB",
  MOVE_TAB = "MOVE_TAB",
  SET_PAGE_NUMBER = "SET_PAGE_NUMBERS",
  SERVER_SET_PAGE_NUMBERS = "SERVER_SET_PAGE_NUMBERS",
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

type ServerAddTab = {
  type: ActionTypes.SERVER_ADD_TAB;
  payload: { key: string; page: number };
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

type ServerSetPageNumbers = {
  type: ActionTypes.SERVER_SET_PAGE_NUMBERS;
  payload: TabPagesType;
};

export type ArticleActions =
  | SetOffset
  | ServerSetOffset
  | AddTab
  | ServerAddTab
  | RemoveTab
  | MoveTab
  | SetPageNumber
  | ServerSetPageNumbers;
