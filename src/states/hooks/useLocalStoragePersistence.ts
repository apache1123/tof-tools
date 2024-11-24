import { useEffect } from "react";
import { proxy, subscribe } from "valtio";
import { devtools, proxySet } from "valtio/utils";

import type { Dto } from "../../models/dto";
import type { Persistable } from "../../models/persistable";

export const localStoragePersistenceState = proxy<{
  persistedKeys: Set<string>;
}>({
  persistedKeys: proxySet(),
});
devtools(localStoragePersistenceState, { name: "localStoragePersistence" });

export function useLocalStoragePersistence<TObjectDto extends Dto>(
  proxyState: Persistable<TObjectDto>,
  key: string,
) {
  useEffect(() => {
    if (localStorage.getItem(key)) {
      proxyState.copyFromDto(JSON.parse(localStorage.getItem(key)!));
    }

    const unsubscribe = subscribe(proxyState, () =>
      localStorage.setItem(key, JSON.stringify(proxyState.toDto())),
    );

    localStoragePersistenceState.persistedKeys.add(key);

    function cleanup() {
      unsubscribe();
      localStoragePersistenceState.persistedKeys.delete(key);
    }

    return cleanup;
  }, [key, proxyState]);
}
