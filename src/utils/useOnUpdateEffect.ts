import { useRef, useEffect, EffectCallback, DependencyList } from "react";

export default function useOnUpdateEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) ref.current = false;
  }, []);
  useEffect(() => {
    if (ref.current) {
      const dismount = effect();
      if (dismount) return dismount;
    } else ref.current = true;
  }, deps);
}
