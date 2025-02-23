import type { RepositoryKey, RepositoryMap } from "../../db/db";
import { useRepository } from "./useRepository";

/** Convenience hook to retrieve a proxy and snapshot item from a repository using a predicate */
export function useRepositoryItem<T extends RepositoryKey>(
  key: T,
  predicate: (
    repository: RepositoryMap[T],
  ) => ReturnType<RepositoryMap[T]["find"]>,
) {
  const { repository, repositoryProxy } = useRepository(key);

  const item = predicate(repository);
  const itemProxy = predicate(repositoryProxy);

  return {
    item,
    itemProxy,
  };
}
