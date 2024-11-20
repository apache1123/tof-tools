import { maxCharacterLevel } from "../definitions/character-level";
import type { CoreElementalType } from "../definitions/elemental-type";
import type { DataById } from "../models/data";
import type { ElementalUserStatsDto } from "../models/deprecated/elemental-user-stats";
import type { Dto } from "../models/dto";
import type { Persistable } from "../models/persistable";
import type { CharacterInfo } from "../models/v4/character/character-info";

export class UserStatsState
  implements CharacterInfo, Persistable<UserStatsStateDtoV2>
{
  public constructor() {
    this.characterLevel = maxCharacterLevel;
  }

  public characterLevel: number;

  public copyFromDto(dto: UserStatsStateDtoV2): void {
    const { characterLevel } = dto;

    this.characterLevel = characterLevel;
  }

  public toDto(): UserStatsStateDtoV2 {
    const { characterLevel } = this;

    return {
      characterLevel,
      version: 2,
    };
  }
}

/** @deprecated Migrated to using Loadouts */
export interface UserStatsStateDtoV1 extends Dto {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStatsDto>;
  version: 1;
}

export interface UserStatsStateDtoV2 extends Dto {
  characterLevel: number;
  version: 2;
}
