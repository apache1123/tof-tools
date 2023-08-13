import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { maxCharacterLevel } from '../../../../constants/character-level';
import { defaultCritDamagePercent } from '../../../../constants/damage-formula';
import type { DataById } from '../../../../models/data';
import type { CoreElementalType } from '../../../../models/stat-type';

export interface ElementalUserStats {
  baseAttackFlatWithGearA: number;
  totalAttackFlatWithGearA: number;
  critFlatWithGearA: number;
  critPercentWithGearA: number;
  critDamageWithGearA: number;
  otherGearElementalDamage: number;
  miscAttackPercent: number;
  miscCritRate: number;
  miscCritDamage: number;
}

export interface UserStatsState {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStats>;
}

export const userStatsStateKey = 'userStats';

export const userStatsState = proxy<UserStatsState>({
  characterLevel: maxCharacterLevel,
  statsByElement: {
    Flame: emptyElementalUserStats(),
    Frost: emptyElementalUserStats(),
    Physical: emptyElementalUserStats(),
    Volt: emptyElementalUserStats(),
  },
});
devtools(userStatsState, { name: userStatsStateKey });

export function setCharacterLevel(value: number) {
  userStatsState.characterLevel = value;
}

function emptyElementalUserStats(): ElementalUserStats {
  return {
    baseAttackFlatWithGearA: 0,
    totalAttackFlatWithGearA: 0,
    critFlatWithGearA: 0,
    critPercentWithGearA: 0,
    critDamageWithGearA: defaultCritDamagePercent,
    otherGearElementalDamage: 0,
    miscAttackPercent: 0,
    miscCritRate: 0,
    miscCritDamage: 0,
  };
}
