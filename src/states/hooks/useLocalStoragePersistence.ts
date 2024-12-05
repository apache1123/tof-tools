import { useEffect } from "react";
import { proxy, subscribe } from "valtio";
import { devtools, proxySet } from "valtio/utils";

import { stateKeyPrefix } from "../../constants/persistence";

export const localStoragePersistenceState = proxy<{
  persistedKeys: Set<string>;
}>({
  persistedKeys: proxySet(),
});
devtools(localStoragePersistenceState, { name: "localStoragePersistence" });

export function useLocalStoragePersistence<T extends object>(
  key: string,
  stateProxy: T,
) {
  useEffect(() => {
    const persistenceKey = `${stateKeyPrefix}${key}`;
    const data = localStorage.getItem(persistenceKey);

    if (data) {
      const persistedState = JSON.parse(data);
      (Object.keys(stateProxy) as (keyof T)[]).forEach((key) => {
        if (persistedState[key]) {
          stateProxy[key] = persistedState[key];
        }
      });
    }

    return subscribe(stateProxy, () => {
      localStorage.setItem(persistenceKey, JSON.stringify(stateProxy));
    });
  }, [key, stateProxy]);
}
