export enum ActionTypes {
  SET_OPEN = "SET_OPEN",
  SET_SLUG = "SET_SLUG",
}

type SetOpen = {
  type: ActionTypes.SET_OPEN;
  payload: boolean;
};

type SetSlug = {
  type: ActionTypes.SET_SLUG;
  payload: string;
};

export type ArticleModalActions = SetOpen | SetSlug;
