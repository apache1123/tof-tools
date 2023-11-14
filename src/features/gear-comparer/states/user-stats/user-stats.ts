import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { maxCharacterLevel } from '../../../../constants/character-level';
import type { CoreElementalType } from '../../../../constants/elemental-type';
import type { DataById } from '../../../../models/data';
import type { Dto } from '../../../../models/dto';
import type { Persistable } from '../../../../models/persistable';
import type { ElementalUserStatsDto } from './elemental-user-stats';

export class UserStatsState implements Persistable<UserStatsStateDtoV2> {
  public characterLevel: number;

  public constructor() {
    this.characterLevel = maxCharacterLevel;
  }

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

export const userStatsStateKey = 'userStats';

export const userStatsState = proxy<UserStatsState>(new UserStatsState());
devtools(userStatsState, { name: userStatsStateKey });
