// Commit 9b03e819 (v3-v4 data migration) introduced a data error where if the user had a loadout that had no weapons, during the migration, a new `CharacterPreset` is added linking to a `teamPresetId`, but the corresponding TeamPreset object was not added to the TeamPreset repo, so we get a foreign key deserialization error when we try to deserialize that CharacterPreset.
// This was fixed in commit 90201328, but affected users still have this inconsistent data, which will eventually fix itself over-time if the user alters that character preset, but if a fix isn't applied it will be difficult to determine if future foreign key deserialization errors are caused by this or another bug, so a fix should be actively applied.
// We shall find all character presets that have a teamPresetId that doesn't link to a saved teamPreset and add a corresponding empty teamPreset. Then from this point on, any further errors can be determined to be caused by something else.

import { repositoryKeyPrefix } from "../../constants/persistence";
import type { CharacterPresetDto } from "../../db/repositories/character-preset/character-preset-dto";
import type { TeamPresetDto } from "../../db/repositories/team/dtos/team-preset-dto";

export function fixMissingTeamPresetsInCharacterPresets() {
  const characterPresetRepoKey = `${repositoryKeyPrefix}characterPresets`;
  const teamPresetRepoKey = `${repositoryKeyPrefix}teamPresets`;

  const characterPresetsJson = localStorage.getItem(characterPresetRepoKey);
  const teamPresetsJson = localStorage.getItem(teamPresetRepoKey);

  const characterPresets = characterPresetsJson
    ? (JSON.parse(characterPresetsJson) as CharacterPresetDto[])
    : undefined;
  const teamPresets = teamPresetsJson
    ? (JSON.parse(teamPresetsJson) as TeamPresetDto[])
    : undefined;

  if (!characterPresets || !teamPresets) return;

  let hasDataFixes = false;

  characterPresets.forEach((characterPreset) => {
    if (
      characterPreset.teamPresetId &&
      !teamPresets.find(
        (teamPreset) => teamPreset.id === characterPreset.teamPresetId,
      )
    ) {
      teamPresets.push({
        id: characterPreset.teamPresetId,
        characterId: characterPreset.characterId,
        weaponPresetIds: [],
        name: `${characterPreset.name} team`,
      });

      hasDataFixes = true;
    }
  });

  if (hasDataFixes) {
    localStorage.setItem(teamPresetRepoKey, JSON.stringify(teamPresets));
  }
}
