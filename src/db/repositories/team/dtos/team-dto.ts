import { Team } from "../../../../models/team/team";
import type { Weapon, WeaponId } from "../../../../models/weapon/weapon";
import { logException } from "../../../../utils/exception-utils";
import { DeserializationError } from "../../../error/deserialization-error";
import type { Dto } from "../../../repository/dto";
import type { Repository } from "../../../repository/types/repository";

export interface TeamDto extends Dto {
  id: string;
  characterId: string;
  weaponIds: (WeaponId | undefined)[];
  version: 2;
}

export function teamToDto(team: Team): TeamDto {
  const { id, characterId } = team;
  return {
    id,
    characterId,
    weaponIds: team.getWeapons().map((weapon) => weapon?.id),
    version: 2,
  };
}

export function dtoToTeam(
  dto: TeamDto,
  weaponRepository: Repository<Weapon>,
): Team {
  const { id, characterId, weaponIds } = dto;
  return new Team(
    characterId,
    id,
    weaponIds.map((weaponId) => {
      if (!weaponId) return undefined;

      const weapon = weaponRepository.find(weaponId);

      if (!weapon) {
        logException(
          new DeserializationError(`Weapon with id ${weaponId} not found`, dto),
        );
      }

      return weapon;
    }),
  );
}
