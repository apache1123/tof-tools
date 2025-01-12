import { TeamPreset } from "../../../../models/team/team-preset";
import type { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import { logException } from "../../../../utils/exception-utils";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";

export interface TeamPresetDto extends Dto {
  id: string;
  characterId: string;
  weaponPresetIds: (string | undefined)[];
  name: string;
  version: 1;
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
    version: 1,
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
          new DeserializationError(
            `Weapon preset with id ${weaponPresetId} not found`,
            dto,
          ),
        );
        return;
      }

      teamPreset.setWeaponPreset(i, weaponPreset);
    }
  });

  return teamPreset;
}
