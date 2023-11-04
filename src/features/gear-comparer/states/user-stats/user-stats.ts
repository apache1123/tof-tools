import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { maxCharacterLevel } from '../../../../constants/character-level';
import type { CoreElementalType } from '../../../../constants/elemental-type';
import type { DataById } from '../../../../models/data';
import type { Dto } from '../../../../models/dto';
import type { ElementalUserStatsDto } from '../../../../models/elemental-user-stats';
import { ElementalUserStats } from '../../../../models/elemental-user-stats';
import { LoadoutStats } from '../../../../models/loadout-stats';
import type { Persistable } from '../../../../models/persistable';

export class UserStatsState implements Persistable<UserStatsStateDto> {
  public characterLevel: number;
  public statsByElement: DataById<CoreElementalType, ElementalUserStats>;

  public constructor() {
    this.characterLevel = maxCharacterLevel;
    this.statsByElement = {
      Flame: newElementalUserStats(),
      Frost: newElementalUserStats(),
      Physical: newElementalUserStats(),
      Volt: newElementalUserStats(),
    };

    function newElementalUserStats(): ElementalUserStats {
      return new ElementalUserStats(new LoadoutStats());
    }
  }

  public copyFromDto(dto: UserStatsStateDto): void {
    const {
      characterLevel,
      statsByElement: { Flame, Frost, Physical, Volt },
    } = dto;

    this.characterLevel = characterLevel;
    this.statsByElement.Flame.copyFromDto(Flame);
    this.statsByElement.Frost.copyFromDto(Frost);
    this.statsByElement.Physical.copyFromDto(Physical);
    this.statsByElement.Volt.copyFromDto(Volt);
  }

  public toDto(): UserStatsStateDto {
    const {
      characterLevel,
      statsByElement: { Flame, Frost, Physical, Volt },
    } = this;

    return {
      characterLevel,
      statsByElement: {
        Flame: Flame.toDto(),
        Frost: Frost.toDto(),
        Physical: Physical.toDto(),
        Volt: Volt.toDto(),
      },
      version: 1,
    };
  }
}

export interface UserStatsStateDto extends Dto {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStatsDto>;
}

export const userStatsStateKey = 'userStats';

export const userStatsState = proxy<UserStatsState>(new UserStatsState());
devtools(userStatsState, { name: userStatsStateKey });
