import { useEffect } from 'react';
import { subscribe } from 'valtio';

export function useLocalStoragePersistence(
  proxyStore: object,
  key: string,
  migrations?: () => void
) {
  useEffect(() => {
    if (localStorage.getItem(key)) {
      Object.assign(
        proxyStore,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        JSON.parse(localStorage.getItem(key)!)
      );
    }

    const unsubscribe = subscribe(proxyStore, () =>
      localStorage.setItem(key, JSON.stringify(proxyStore))
    );

    // Any data-fixes/cleanups from migrating an old schema stored in user's localStorage to current schema
    if (migrations) migrations();

    return unsubscribe;
  }, [key, migrations, proxyStore]);
}
