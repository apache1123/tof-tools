import { useSnapshot } from "valtio";

import { db } from "../../db/reactive-local-storage-db";
import type { CharacterId } from "../../models/character/character";
import type { TeamPreset } from "../../models/team/team-preset";

export function useTeamPresets(characterId: CharacterId) {
  return useSnapshot(db.get("teamPresets")).filter(
    (teamPreset) => teamPreset.characterId === characterId,
  ) as TeamPreset[];
}
