import { useSnapshot } from "valtio";

import type { Repository } from "../../db/repository/types/repository";
import type { CharacterId } from "../../models/character/character-data";
import type { Identifiable } from "../../models/identifiable";

/** Convenience hook to retrieve proxy/snapshot items that belong to a particular character from a repository. The items of the repository must have a characterId field */
export function useItemsBelongingToCharacter<
  T extends Identifiable & { characterId: CharacterId },
>(repository: Repository<T>, characterId: CharacterId) {
  function filterByCharacter(item: T) {
    return item.characterId === characterId;
  }

  const itemProxies = repository.filter(filterByCharacter);
  const items = useSnapshot(repository).filter(filterByCharacter);

  return {
    itemProxies,
    items,
  };
}
