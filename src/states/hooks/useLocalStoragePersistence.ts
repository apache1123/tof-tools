import { useEffect } from 'react';
import { proxy, subscribe } from 'valtio';
import { devtools, proxySet } from 'valtio/utils';

import type { Persistable } from '../../models/persistable';

export const localStoragePersistenceState = proxy<{
  persistedKeys: Set<string>;
}>({
  persistedKeys: proxySet(),
});
devtools(localStoragePersistenceState, { name: 'localStoragePersistence' });

export function useLocalStoragePersistence<TObjectDTO>(
  proxyState: Persistable<TObjectDTO>,
  key: string
) {
  useEffect(() => {
    if (localStorage.getItem(key)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      proxyState.copyFromDTO(JSON.parse(localStorage.getItem(key)!));
    }

    const unsubscribe = subscribe(proxyState, () =>
      localStorage.setItem(key, JSON.stringify(proxyState.toDTO()))
    );

    localStoragePersistenceState.persistedKeys.add(key);

    function cleanup() {
      unsubscribe();
      localStoragePersistenceState.persistedKeys.delete(key);
    }

    return cleanup;
  }, [key, proxyState]);
}
