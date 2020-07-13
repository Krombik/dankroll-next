import useSWR, { useSWRInfinite } from "swr";
import { useRef } from "react";
import { keyInterface } from "swr/dist/types";
import fetcher from "./fetcher";
import { FetchRV } from "../types";

export function useRequest<T = any>(
  key: keyInterface,
  initialData: FetchRV<T>
) {
  const ref = useRef(initialData);
  const obj = useSWR<FetchRV<T>>(key, fetcher.get, {
    initialData: ref.current,
  });
  if (ref.current) ref.current = undefined;
  return obj;
}

export function useRequestInfinity<T = any>(
  getKey: (
    index: number,
    previousPageData: FetchRV<T> | null
  ) => string | any[],
  initialData: FetchRV<T>
) {
  const ref = useRef([initialData]);
  const obj = useSWRInfinite<FetchRV<T>>(getKey, fetcher.get, {
    initialData: ref.current,
  });
  if (ref.current) ref.current = undefined;
  return obj;
}
