import { AxiosResponse } from "axios";

type ErrorsType = { [key: string]: string[] };
type ErrorsObj = { errors?: ErrorsType };

export type FetcherFailError = ErrorsObj & Pick<AxiosResponse, "status">;
