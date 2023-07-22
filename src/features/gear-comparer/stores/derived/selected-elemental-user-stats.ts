import { derive } from 'valtio/utils';

import { gearComparerOptionsStore } from '../gear-comparer-options';
import type { ElementalUserStats } from '../user-stats';
import { userStatsStore } from '../user-stats';

export interface SelectedElementalUserStatsStore {
  selectedElementalUserStats: ElementalUserStats | undefined;
}

export const selectedElementalUserStatsStore = derive<
  object,
  SelectedElementalUserStatsStore
>({
  selectedElementalUserStats: (get) => {
    const { selectedElementalType } = get(gearComparerOptionsStore);
    if (!selectedElementalType) {
      return undefined;
    }

    return get(userStatsStore).statsByElement[selectedElementalType];
  },
});

export function setBaseAttackFlatWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.baseAttackFlatWithGearA = value;
  }
}
export function setCritFlatWithGearA(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.critFlatWithGearA = value;
  }
}
export function setOtherGearAttackPercent(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.otherGearAttackPercent = value;
  }
}
export function setOtherGearElementalDamage(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.otherGearElementalDamage = value;
  }
}
export function setMiscAttackPercent(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.miscAttackPercent = value;
  }
}
export function setMiscCritRate(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.miscCritRate = value;
  }
}
export function setMiscCritDamage(value: number) {
  const { selectedElementalUserStats } = selectedElementalUserStatsStore;
  if (selectedElementalUserStats) {
    selectedElementalUserStats.miscCritDamage = value;
  }
}
