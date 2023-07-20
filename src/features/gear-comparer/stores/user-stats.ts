import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

import { maxCharacterLevel } from '../../../constants/character-level';
import type { CoreElementalType } from '../../../models/stat-type';

export interface UserStatsStore {
  elementalType: CoreElementalType | undefined;
  otherAttackFlat: number;
  critFlat: number;
  characterLevel: number;
  otherGearAttackPercent: number;
  otherGearElementalDamage: number;
  miscAttackPercent: number;
  miscCritRate: number;
  miscCritDamage: number;
}

export const userStatsStoreKey = 'userStats';

export const userStatsStore = proxy<UserStatsStore>({
  elementalType: undefined,
  otherAttackFlat: 0,
  critFlat: 0,
  characterLevel: maxCharacterLevel,
  otherGearAttackPercent: 0,
  otherGearElementalDamage: 0,
  miscAttackPercent: 0,
  miscCritRate: 0,
  miscCritDamage: 0,
});
devtools(userStatsStore, { name: userStatsStoreKey });

export function setElementalType(elementalType: CoreElementalType) {
  userStatsStore.elementalType = elementalType;
}
export function setOtherAttackFlat(value: number) {
  userStatsStore.otherAttackFlat = value;
}
export function setCritFlat(value: number) {
  userStatsStore.critFlat = value;
}
export function setCharacterLevel(value: number) {
  userStatsStore.characterLevel = value;
}
export function setOtherGearAttackPercent(value: number) {
  userStatsStore.otherGearAttackPercent = value;
}
export function setOtherGearElementalDamage(value: number) {
  userStatsStore.otherGearElementalDamage = value;
}
export function setMiscAttackPercent(value: number) {
  userStatsStore.miscAttackPercent = value;
}
export function setMiscCritRate(value: number) {
  userStatsStore.miscCritRate = value;
}
export function setMiscCritDamage(value: number) {
  userStatsStore.miscCritDamage = value;
}
