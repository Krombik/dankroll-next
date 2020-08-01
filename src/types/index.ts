import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { combinedReducer } from "../redux/reducer";
import { Actions } from "./actions";
import { Store } from "redux";
import {
  GetStaticProps,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from "next";
import { AxiosResponse } from "axios";

export type PropsFromServer<T> = T extends GetServerSideProps<
  Promise<GetServerSidePropsResult<infer U> | null>
>
  ? U
  : T extends GetStaticProps<Promise<GetStaticPropsResult<infer U> | null>>
  ? U
  : never;

export type State = ReturnType<typeof combinedReducer>;

export type ThunkResult<R = void> = ThunkAction<R, State, unknown, Actions>;

export type ThunkDispatcher = ThunkDispatch<State, any, Actions>;

type ThunkStore = {
  store: Store<State, Actions> & { dispatch: ThunkDispatcher };
};

export type ServerSideContext = GetServerSidePropsContext & ThunkStore;
export type StaticPropsContext = GetStaticPropsContext & ThunkStore;

export type ErrorsType = { [key: string]: string[] };
export type ErrorsObj = { errors?: ErrorsType };

type FetcherFailError = ErrorsObj & Pick<AxiosResponse, "status">;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type FetchRV<T> = XOR<T, FetcherFailError>;
