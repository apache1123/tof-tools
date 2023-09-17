import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { maxCharacterLevel } from '../../../../constants/character-level';
import type { CoreElementalType } from '../../../../constants/elemental-type';
import type { DataById } from '../../../../models/data';
import type { Persistable } from '../../../../models/persistable';
import type { ElementalUserStatsDTO } from './elemental-user-stats';
import { ElementalUserStats } from './elemental-user-stats';

export class UserStatsState implements Persistable<UserStatsStateDTO> {
  public characterLevel: number;
  public statsByElement: DataById<CoreElementalType, ElementalUserStats>;

  public constructor() {
    this.characterLevel = maxCharacterLevel;
    this.statsByElement = {
      Flame: new ElementalUserStats(),
      Frost: new ElementalUserStats(),
      Physical: new ElementalUserStats(),
      Volt: new ElementalUserStats(),
    };
  }

  public copyFromDTO(dto: UserStatsStateDTO): void {
    const {
      characterLevel,
      statsByElement: { Flame, Frost, Physical, Volt },
    } = dto;

    this.characterLevel = characterLevel;
    this.statsByElement.Flame.copyFromDTO(Flame);
    this.statsByElement.Frost.copyFromDTO(Frost);
    this.statsByElement.Physical.copyFromDTO(Physical);
    this.statsByElement.Volt.copyFromDTO(Volt);
  }

  public toDTO(): UserStatsStateDTO {
    const {
      characterLevel,
      statsByElement: { Flame, Frost, Physical, Volt },
    } = this;

    return {
      characterLevel,
      statsByElement: {
        Flame: Flame.toDTO(),
        Frost: Frost.toDTO(),
        Physical: Physical.toDTO(),
        Volt: Volt.toDTO(),
      },
    };
  }
}

export interface UserStatsStateDTO {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStatsDTO>;
}

export const userStatsStateKey = 'userStats';

export const userStatsState = proxy<UserStatsState>(new UserStatsState());
devtools(userStatsState, { name: userStatsStateKey });
