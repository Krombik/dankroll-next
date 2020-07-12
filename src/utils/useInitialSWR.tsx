import useSWR, { useSWRInfinite } from "swr";
import { useRef } from "react";
import { fetcherFn, keyInterface } from "swr/dist/types";

export function useInitialSWR<T = any>(
  key: keyInterface,
  fetcher: fetcherFn<T>,
  initialData: T
) {
  const ref = useRef(initialData);
  const obj = useSWR<T>(key, fetcher, {
    initialData: ref.current,
  });
  if (ref.current) ref.current = undefined;
  return obj;
}

export function useInitialSWRInfinity<T = any>(
  getKey: (index: number, previousPageData: T | null) => string | any[],
  fetcher: fetcherFn<T>,
  initialData: T
) {
  const ref = useRef([initialData]);
  const obj = useSWRInfinite<T>(getKey, fetcher, {
    initialData: ref.current,
  });
  if (ref.current) ref.current = undefined;
  return obj;
}
