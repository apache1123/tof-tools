import { Team } from "../../../models/team/team";
import type { Weapon } from "../../../models/weapon/weapon";
import type { Dto } from "../../repository/dto";
import type { Repository } from "../../repository/types/repository";
import type { WeaponSlotDto } from "../weapon/dtos/weapon-slot-dto";
import {
  dtoToWeaponSlot,
  weaponSlotToDto,
} from "../weapon/dtos/weapon-slot-dto";

export interface TeamDto extends Dto {
  id: string;
  characterId: string;
  weaponSlots: WeaponSlotDto[];
  version: 2;
}

export function teamToDto(team: Team): TeamDto {
  const { id, characterId, weaponSlots } = team;
  return {
    id,
    characterId,
    weaponSlots: weaponSlots.map(weaponSlotToDto),
    version: 2,
  };
}

export function dtoToTeam(
  dto: TeamDto,
  weaponRepository: Repository<Weapon>,
): Team {
  const { id, characterId, weaponSlots } = dto;
  return new Team(
    characterId,
    id,
    weaponSlots.map((weaponSlot) =>
      dtoToWeaponSlot(weaponSlot, weaponRepository),
    ),
  );
}
