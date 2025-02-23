import { TeamPreset } from "../../../../models/team/team-preset";
import type { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import { logException } from "../../../../utils/exception-utils";
import { ForeignKeyDeserializationError } from "../../../error/foreign-key-deserialization-error";
import type { Repository } from "../../../repository/types/repository";

export interface TeamPresetDto {
  id: string;
  characterId: string;
  weaponPresetIds: (string | undefined)[];
  name: string;
}

export function teamPresetToDto(teamPreset: TeamPreset): TeamPresetDto {
  const { id, characterId, name } = teamPreset;
  return {
    id,
    characterId,
    weaponPresetIds: teamPreset
      .getWeaponPresets()
      .map((weaponPreset) => weaponPreset?.id),
    name,
  };
}

export function dtoToTeamPreset(
  dto: TeamPresetDto,
  weaponPresetRepository: Repository<WeaponPreset>,
): TeamPreset {
  const { id, characterId, weaponPresetIds, name } = dto;

  const teamPreset = new TeamPreset(characterId, id);
  teamPreset.name = name;

  weaponPresetIds.forEach((weaponPresetId, i) => {
    if (weaponPresetId) {
      const weaponPreset = weaponPresetRepository.find(weaponPresetId);

      if (!weaponPreset) {
        logException(
          new ForeignKeyDeserializationError(
            `Weapon preset not found`,
            dto,
            weaponPresetRepository,
          ),
        );
        return;
      }

      teamPreset.setWeaponPreset(i, weaponPreset);
    }
  });

  return teamPreset;
}
