import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { combinedReducer } from "../redux/reducer";
import { Actions } from "./actions";
import { Store } from "redux";
import {
  InferGetStaticPropsType,
  GetStaticProps,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
} from "next";

type UnPromisify<T> = T extends PromiseLike<infer U> ? U : T;

export type PropsFromServer<
  T extends GetStaticProps | GetServerSideProps
> = UnPromisify<InferGetStaticPropsType<T>>["props"];

export type State = ReturnType<typeof combinedReducer>;

export type ThunkResult<R = void> = ThunkAction<R, State, unknown, Actions>;

export type ThunkDispatcher = ThunkDispatch<State, any, Actions>;

type ThunkStore = {
  store: Store<State, Actions> & { dispatch: ThunkDispatcher };
};

export type ServerSideContext = GetServerSidePropsContext & ThunkStore;
export type StaticPropsContext = GetStaticPropsContext & ThunkStore;

export type FetchError = { status: string; error: string };

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type FetchRV<T> = XOR<T, FetchError>;
