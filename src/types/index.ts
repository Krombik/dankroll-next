import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { combinedReducer } from "../redux/reducers";
import { wrapper } from "../redux/store";
export * from "./article";
import { Actions } from "./actions";
import { InferGetStaticPropsType, GetStaticProps } from "next";

type UnPromisify<T> = T extends PromiseLike<infer U> ? U : T;

export type StaticProps<T extends GetStaticProps> = UnPromisify<
  InferGetStaticPropsType<T>
>["props"];

export type State = ReturnType<typeof combinedReducer>;

export type ThunkResult<R = void> = ThunkAction<R, State, unknown, Actions>;

export type ThunkDispatcher = ThunkDispatch<State, any, Actions>;

type Context = Parameters<Parameters<typeof wrapper.getStaticProps>[0]>[0];
type Store = Context["store"];

export type ThunkContext = Context & {
  store: Store & { dispatch: ThunkDispatcher };
};
