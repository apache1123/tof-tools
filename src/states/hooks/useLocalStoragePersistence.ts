import { useEffect } from 'react';
import { subscribe } from 'valtio';

import type { Persistable } from '../../models/persistable';

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

    return unsubscribe;
  }, [key, proxyState]);
}
