import { useSnapshot } from "valtio";

import type { RepositoryKey } from "../../db/db";
import { db } from "../../db/reactive-local-storage-db";

/** Convenience hook to retrieve a proxy and snapshot of a repository */
export function useRepository<T extends RepositoryKey>(key: T) {
  const repositoryProxy = db.get(key);
  const repository = useSnapshot(db.get(key)) as typeof repositoryProxy;

  return {
    repository,
    repositoryProxy,
  };
}
