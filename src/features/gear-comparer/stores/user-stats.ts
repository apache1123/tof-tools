import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { maxCharacterLevel } from '../../../constants/character-level';
import type { DataById } from '../../../models/data';
import type { CoreElementalType } from '../../../models/stat-type';

export interface ElementalUserStats {
  baseAttackFlatWithGearA: number;
  critFlatWithGearA: number;
  otherGearAttackPercent: number;
  otherGearElementalDamage: number;
  miscAttackPercent: number;
  miscCritRate: number;
  miscCritDamage: number;
}

export interface UserStatsStore {
  characterLevel: number;
  statsByElement: DataById<CoreElementalType, ElementalUserStats>;
}

export const userStatsStoreKey = 'userStats';

export const userStatsStore = proxy<UserStatsStore>({
  characterLevel: maxCharacterLevel,
  statsByElement: {
    Flame: emptyElementalUserStats(),
    Frost: emptyElementalUserStats(),
    Physical: emptyElementalUserStats(),
    Volt: emptyElementalUserStats(),
  },
});
devtools(userStatsStore, { name: userStatsStoreKey });

export function setCharacterLevel(value: number) {
  userStatsStore.characterLevel = value;
}

function emptyElementalUserStats(): ElementalUserStats {
  return {
    baseAttackFlatWithGearA: 0,
    critFlatWithGearA: 0,
    otherGearAttackPercent: 0,
    otherGearElementalDamage: 0,
    miscAttackPercent: 0,
    miscCritRate: 0,
    miscCritDamage: 0,
  };
}
