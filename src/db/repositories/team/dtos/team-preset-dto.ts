import { TeamPreset } from "../../../../models/team/team-preset";
import type { WeaponPreset } from "../../../../models/weapon/weapon-preset";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";
import type { WeaponPresetSlotDto } from "../../weapon/dtos/weapon-preset-slot-dto";
import {
  dtoToWeaponPresetSlot,
  weaponPresetSlotToDto,
} from "../../weapon/dtos/weapon-preset-slot-dto";

export interface TeamPresetDto extends Dto {
  id: string;
  characterId: string;
  weaponPresetSlots: WeaponPresetSlotDto[];
  name: string;
  version: 1;
}

export function teamPresetToDto(teamPreset: TeamPreset): TeamPresetDto {
  const { id, characterId, weaponPresetSlots, name } = teamPreset;
  return {
    id,
    characterId,
    weaponPresetSlots: weaponPresetSlots.map(weaponPresetSlotToDto),
    name,
    version: 1,
  };
}

export function dtoToTeamPreset(
  dto: TeamPresetDto,
  weaponPresetRepository: Repository<WeaponPreset>,
): TeamPreset {
  const { id, characterId, weaponPresetSlots, name } = dto;

  const teamPreset = new TeamPreset(
    characterId,
    id,
    weaponPresetSlots.map((slotDto) =>
      dtoToWeaponPresetSlot(slotDto, weaponPresetRepository),
    ),
  );
  teamPreset.name = name;

  return teamPreset;
}
